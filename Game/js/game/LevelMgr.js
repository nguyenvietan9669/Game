class LevelMgr
{
    constructor()
    {
        this.mLevelIndex;
        this.mModuleIndex;
        this.mRowIndex;
    }



    RandomLevel()
    {
        this.mLevelIndex = Math.floor(LevelDefine.ARR_LEVEL.length*Math.random());
        this.mModuleIndex = 0;
        this.mRowIndex = -1;

        // console.log(this.mLevelIndex);
    }

    GetNextRow()
    {
        let level = LevelDefine.ARR_LEVEL[this.mLevelIndex];
        let module = level[this.mModuleIndex];

        this.mRowIndex++;
        if(this.mRowIndex >= module.length)
        {
            this.mRowIndex = 0;

            this.mModuleIndex++;
            if(this.mModuleIndex >= level.length)
            {
                this.mModuleIndex = 0;
            }

            module = level[this.mModuleIndex];
        }

        return module[this.mRowIndex];
    }

    AddModuleTutorial()
    {
        let level = LevelDefine.ARR_LEVEL[this.mLevelIndex];
        level[0] = LevelDefine.MODULE_TUTORIAL;
    }

    RemoveModuleTutorial()
    {
        let level = LevelDefine.ARR_LEVEL[this.mLevelIndex];
        level[0] = LevelDefine.MODULE_NULL;
    }

}
module.exports = LevelMgr;