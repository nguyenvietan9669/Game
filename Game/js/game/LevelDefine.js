class LevelDefine
{
    constructor()
    {
        

        //MODULE ##################################################
        this.MODULE_01 = [
            [0, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [0, 0, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
			[1, 0, 0],
			[1, 0, 0],
        ];

        this.MODULE_02 = [
            [0, 0, 0],
            [0, 0, 1],
            [0, 0, 1],
            [0, 0, 0],
            [0, 0, 11],
            [0, 1, 0],
            [0, 1, 0],
			[0, 1, 0],
			[0, 12, 1],
			[0, 0, 1],
        ];

        this.MODULE_03 = [
            [0, 0, 0],
            [0, 0, 0],
            [1, 0, 0],
            [1, 0, 0],
            [11, 0, 12],
            [0, 0, 0],
            [0, 1, 0],
			[0, 1, 0],
            [0, 11, 0],
            [0, 0, 0],
        ];

        this.MODULE_04 = [
            [0, 0, 0],
            [12, 0, 1],
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 11],
            [0, 1, 0],
            [0, 1, 0],
			[1, 11, 1],
            [1, 0, 1],
            [0, 12, 1],
        ];

        this.MODULE_05 = [
            [0, 0, 0],
            [11, 0, 12],
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 11, 0],
            [1, 0, 0],
			[1, 0, 0],
            [12, 0, 0],
            [0, 0, 0],
        ];

        this.MODULE_06 = [
            [0, 0, 0],
            [1, 12, 0],
            [1, 0, 0],
            [1, 0, 0],
            [0, 0, 0],
            [11, 0, 1],
            [0, 0, 1],
			[0, 1, 11],
            [0, 1, 0],
            [0, 0, 0],
        ];

        this.MODULE_07 = [
            [0, 0, 0],
            [0, 1, 12],
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 0],
            [1, 11, 1],
            [0, 1, 0],
			[0, 1, 0],
            [0, 0, 1],
            [12, 0, 1],
        ];

        this.MODULE_08 = [
            [0, 1, 0],
            [0, 1, 12],
            [1, 0, 0],
            [1, 0, 0],
            [0, 0, 0],
            [11, 1, 11],
            [0, 1, 0],
			[0, 0, 1],
            [0, 0, 1],
            [0, 12, 0],
        ];

        this.MODULE_09 = [
            [0, 0, 0],
            [1, 0, 12],
            [1, 0, 0],
            [0, 1, 0],
            [0, 1, 0],
            [0, 11, 1],
            [0, 0, 1],
			[0, 1, 0],
            [0, 1, 0],
            [12, 0, 0],
        ];

        this.MODULE_10 = [
            [0, 1, 0],
            [0, 1, 0],
            [1, 12, 0],
            [0, 1, 0],
            [0, 0, 0],
            [11, 11, 1],
            [0, 0, 0],
			[0, 1, 12],
            [1, 0, 1],
            [1, 0, 1],
        ];

        //---------------------------
        this.MODULE_NULL = [
            [0, 0, 0],
        ];
        this.MODULE_TUTORIAL = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [1, 12, 1],
            [1, 0, 1],
            [1, 0, 1],
            [0, 0, 0],
            [0, 0, 0],
            [11, 11, 11],
            [0, 0, 0],
			[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [1, 0, 1],
            [1, 0, 1],
            [0, 1, 0],
            [0, 1, 0],
            [1, 0, 1],
            [1, 0, 1],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
		
        //LEVEL ######################################################
        this.LEVEL_01 = [
            this.MODULE_TUTORIAL,
            this.MODULE_01,
            this.MODULE_02,
            this.MODULE_03,
			this.MODULE_04,
			this.MODULE_05,
			this.MODULE_06,
			this.MODULE_07,
			this.MODULE_08,
			this.MODULE_09,
			this.MODULE_10,
			this.MODULE_01,
			this.MODULE_03,
			this.MODULE_07,
			this.MODULE_08,
			this.MODULE_05,
			this.MODULE_03,
			this.MODULE_02,
			this.MODULE_09,
        ];

        this.LEVEL_02 = [
            this.MODULE_TUTORIAL,
            this.MODULE_01,
            this.MODULE_02,
            this.MODULE_03,
        ];

        //ARRLEVEL ##########################################################
        this.ARR_LEVEL = [
            this.LEVEL_01,
            // this.LEVEL_02,
        ];

    }
}
module.exports = LevelDefine;