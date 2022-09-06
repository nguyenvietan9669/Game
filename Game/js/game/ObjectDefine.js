class ObjectDefine
{
    constructor()
    {
        //OBJECT TYPE
        this.OBJECT_TYPE = {};
        this.OBJECT_TYPE.NO_THING = 0;
        this.OBJECT_TYPE.ITEM_01 = 1;
        this.OBJECT_TYPE.OBSTACLE_01 = 11;
        this.OBJECT_TYPE.OBSTACLE_02 = 12;
        this.OBJECT_TYPE.OBSTACLE_03 = 13;
        this.OBJECT_TYPE.OBSTACLE_04 = 14;

        //OBJECT INFOR #######################################################
        this.OBJECT_INFOR = [
            {
                TYPE: this.OBJECT_TYPE.ITEM_01,
                SCORE: GameDefine.SCORE_ITEM,
                FRENZY_SCORE: GameDefine.SCORE_FRENZY_ITEM,
                SOUND: SFX_COLLECT_1,
                
                ANIM_INIT_CENTER: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_LEFT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_RIGHT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_IS_LOOP: false,

                ANIM_ACTIVE_CENTER: SPRITE_GAME_ANIM_ITEM,
                ANIM_ACTIVE_LEFT: SPRITE_GAME_ANIM_ITEM,
                ANIM_ACTIVE_RIGHT: SPRITE_GAME_ANIM_ITEM,
                ANIM_ACTIVE_IS_LOOP: true,

                ANIM_COLLISION_CENTER: SPRITE_GAME_ANIM_DISAPPEAR_EFFECT,
                ANIM_COLLISION_LEFT: SPRITE_GAME_ANIM_DISAPPEAR_EFFECT,
                ANIM_COLLISION_RIGHT: SPRITE_GAME_ANIM_DISAPPEAR_EFFECT,
                ANIM_COLLISION_LOOP: false,
            },

            {
                TYPE: this.OBJECT_TYPE.OBSTACLE_01,
                SCORE: GameDefine.SCORE_OBSTACLE,
                FRENZY_SCORE: GameDefine.SCORE_FRENZY_OBSTACLE,
                SOUND: SFX_IMPACT,

                ANIM_INIT_CENTER: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_LEFT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_RIGHT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_IS_LOOP: false,

                ANIM_ACTIVE_CENTER: SPRITE_GAME_ANIM_OBSTACLE_1_CENTER,
                ANIM_ACTIVE_LEFT: SPRITE_GAME_ANIM_OBSTACLE_1_LEFT,
                ANIM_ACTIVE_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_1_RIGHT,
                ANIM_ACTIVE_IS_LOOP: true,

                ANIM_COLLISION_CENTER: SPRITE_GAME_ANIM_OBSTACLE_1_CENTER,
                ANIM_COLLISION_LEFT: SPRITE_GAME_ANIM_OBSTACLE_1_LEFT,
                ANIM_COLLISION_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_1_RIGHT,
                ANIM_COLLISION_LOOP: true,
            },

            {
                TYPE: this.OBJECT_TYPE.OBSTACLE_02,
                SCORE: GameDefine.SCORE_OBSTACLE,
                FRENZY_SCORE: GameDefine.SCORE_FRENZY_OBSTACLE,
                SOUND: SFX_IMPACT,
                
                ANIM_INIT_CENTER: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_LEFT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_RIGHT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_IS_LOOP: false,

                ANIM_ACTIVE_CENTER: SPRITE_GAME_ANIM_OBSTACLE_2_CENTER,
                ANIM_ACTIVE_LEFT: SPRITE_GAME_ANIM_OBSTACLE_2_LEFT,
                ANIM_ACTIVE_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_2_RIGHT,
                ANIM_ACTIVE_IS_LOOP: true,

                ANIM_COLLISION_CENTER: SPRITE_GAME_ANIM_OBSTACLE_2_CENTER,
                ANIM_COLLISION_LEFT: SPRITE_GAME_ANIM_OBSTACLE_2_LEFT,
                ANIM_COLLISION_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_2_RIGHT,
                ANIM_COLLISION_LOOP: true,
            },

            {
                TYPE: this.OBJECT_TYPE.OBSTACLE_03,
                SCORE: GameDefine.SCORE_OBSTACLE,
                FRENZY_SCORE: GameDefine.SCORE_FRENZY_OBSTACLE,
                SOUND: SFX_COLLECT_1,
                
                ANIM_INIT_CENTER: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_LEFT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_RIGHT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_IS_LOOP: false,

                ANIM_ACTIVE_CENTER: SPRITE_GAME_ANIM_OBSTACLE_3,
                ANIM_ACTIVE_LEFT: SPRITE_GAME_ANIM_OBSTACLE_3,
                ANIM_ACTIVE_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_3,
                ANIM_ACTIVE_IS_LOOP: true,

                ANIM_COLLISION_CENTER: SPRITE_GAME_ANIM_OBSTACLE_3,
                ANIM_COLLISION_LEFT: SPRITE_GAME_ANIM_OBSTACLE_3,
                ANIM_COLLISION_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_3,
                ANIM_COLLISION_LOOP: true,
            },

            {
                TYPE: this.OBJECT_TYPE.OBSTACLE_04,
                SCORE: GameDefine.SCORE_OBSTACLE,
                FRENZY_SCORE: GameDefine.SCORE_FRENZY_OBSTACLE,
                SOUND: SFX_COLLECT_1,
                
                ANIM_INIT_CENTER: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_LEFT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_RIGHT: SPRITE_GAME_ANIM_NULL,
                ANIM_INIT_IS_LOOP: false,

                ANIM_ACTIVE_CENTER: SPRITE_GAME_ANIM_OBSTACLE_4,
                ANIM_ACTIVE_LEFT: SPRITE_GAME_ANIM_OBSTACLE_4,
                ANIM_ACTIVE_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_4,
                ANIM_ACTIVE_IS_LOOP: true,

                ANIM_COLLISION_CENTER: SPRITE_GAME_ANIM_OBSTACLE_4,
                ANIM_COLLISION_LEFT: SPRITE_GAME_ANIM_OBSTACLE_4,
                ANIM_COLLISION_RIGHT: SPRITE_GAME_ANIM_OBSTACLE_4,
                ANIM_COLLISION_LOOP: true,
            },
        ];

        //CHARACTER INFOR
        //-------------------------------------------
        this.INFOR_01 = {};
        
        this.INFOR_01.SPRITE_MC1 = GUI_SPRITE_MC;
        this.INFOR_01.ANIM_INIT = {MC1: true, ID: SPRITE_MC_ANIM_NULL};
        this.INFOR_01.ANIM_RUN = {MC1: true, ID: SPRITE_MC_ANIM_MC_IDLE_CENTER};
        this.INFOR_01.ANIM_RUN_RIGHT = {MC1: true, ID: SPRITE_MC_ANIM_MC_IDLE_RIGHT};
        this.INFOR_01.ANIM_RUN_LEFT = {MC1: true, ID: SPRITE_MC_ANIM_MC_IDLE_LEFT};
        
        this.INFOR_01.SPRITE_MC2 = GUI_SPRITE_MC2;
        this.INFOR_01.ANIM_TURN_RIGHT_TO_CENTER = {MC1: false, ID: SPRITE_MC2_ANIM_MOVE_RIGHT_TO_CENTER};
        this.INFOR_01.ANIM_TURN_CENTER_TO_LEFT = {MC1: false, ID: SPRITE_MC2_ANIM_MOVE_CENTER_TO_LEFT};
        this.INFOR_01.ANIM_TURN_LEFT_TO_CENTER = {MC1: false, ID: SPRITE_MC2_ANIM_MOVE_LEFT_TO_CENTER};
        this.INFOR_01.ANIM_TURN_CENTER_TO_RIGHT = {MC1: false, ID: SPRITE_MC2_ANIM_MOVE_CENTER_TO_RIGHT};
        this.INFOR_01.ANIM_JUMP = {MC1: false, ID: SPRITE_MC2_ANIM_MOVE_JUMP};

        this.INFOR_01.FRENZY_SPRITE_ID = GUI_SPRITE_MC;
        this.INFOR_01.FRENZY_EFFECT_01 = SPRITE_MC_ANIM_NULL;
        this.INFOR_01.FRENZY_EFFECT_02 = SPRITE_MC_ANIM_NULL;

        this.INFOR_01.SHADOW_SPRITE_ID = GUI_SPRITE_MC2;
        this.INFOR_01.ANIM_SHADOW = SPRITE_MC2_ANIM_SHADOW;


        
        //---------------------------------------------------------------
		this.CHARACTER_INFOR = {
			currentIndex: 0,
			ARR_INFOR: [
				this.INFOR_01
			],
		};

    }

    //PUBLIC FUNCTION
    GetObjectInfor(objectType)
    {
        let length = this.OBJECT_INFOR.length;
        for(let i = 0; i < length; i++)
        {
            if(this.OBJECT_INFOR[i].TYPE == objectType)
            {
                return this.OBJECT_INFOR[i];
            }
        }
        return undefined;
    }

    //PRIVATE FUNCTION
    

}
module.exports = ObjectDefine;