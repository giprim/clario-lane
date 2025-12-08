CREATE OR REPLACE FUNCTION claim_quest(quest_uuid UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_quest RECORD;
  v_user_quest RECORD;
  v_current_stats RECORD;
  v_xp_reward INT;
  v_new_total_xp INT;
  v_new_level INT;
BEGIN
  -- Get current user ID
  v_user_id := auth.uid();
  
  -- Check if quest exists
  SELECT * FROM quests WHERE id = quest_uuid INTO v_quest;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quest not found';
  END IF;

  -- Check if user has progress and completed the quest
  SELECT * FROM user_quests 
  WHERE user_id = v_user_id AND quest_id = quest_uuid
  INTO v_user_quest;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quest progress not found';
  END IF;

  IF v_user_quest.is_completed = false THEN
    RAISE EXCEPTION 'Quest is not completed yet';
  END IF;

  IF v_user_quest.claimed_at IS NOT NULL THEN
    RAISE EXCEPTION 'Quest already claimed';
  END IF;

  -- Get reward
  v_xp_reward := v_quest.xp_reward;

  -- Mark as claimed
  UPDATE user_quests
  SET claimed_at = NOW(),
      updated_at = NOW()
  WHERE user_id = v_user_id AND quest_id = quest_uuid;

  -- Add XP to user stats
  SELECT * FROM user_stats WHERE user_id = v_user_id INTO v_current_stats;
  
  -- If no stats exist, create them (should rarely happen if they played)
  IF NOT FOUND THEN
    INSERT INTO user_stats (user_id, xp, level)
    VALUES (v_user_id, v_xp_reward, 1)
    RETURNING xp, level INTO v_new_total_xp, v_new_level;
  ELSE
    v_new_total_xp := v_current_stats.xp + v_xp_reward;
    
    -- Calculate new level (simple logical reuse or call existing function if available)
    -- Assuming calculate_level(total_xp) exists from practice/index.ts context
    -- If not, we can use a simple formula or rely on another trigger. 
    -- Let's try to call the function 'calculate_level' if it exists.
    -- If we are unsure, we can duplicate the simple logic or just increment XP.
    -- Let's assume calculate_level exists as it was used in edge function.
    
    -- Check if function exists first to avoid error? No, plpgsql parses valid SQL. 
    -- IMPORTANT: If calculate_level is not a SQL function but only in TS, we have a problem.
    -- But practice/index.ts called: await supabaseClient.rpc("calculate_level", { total_xp: newTotalXp });
    -- So it IS a SQL function. Perfect.
    
    v_new_level := calculate_level(v_new_total_xp);

    UPDATE user_stats
    SET xp = v_new_total_xp,
        level = v_new_level,
        updated_at = NOW()
    WHERE user_id = v_user_id;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'xp_gained', v_xp_reward,
    'new_total_xp', v_new_total_xp,
    'new_level', v_new_level
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', SQLERRM
    );
END;
$$;
