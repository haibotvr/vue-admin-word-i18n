<template>
  <div class="app-container">
    <el-row :gutter="18">
      <el-col v-show="dialogWrite" :span="10" :offset="7">
        <div class="grid-content bg-purple">

          <div class="number"><span>{{ nowPosition + 1 }}</span>/{{ totalNum }}</div>
          <!-- <div class="picture"><img src="../../../assets/study/orange.png" /></div> -->
          <h3 v-show="dialogTip" align="center">{{ answer }}</h3>
          <div class="sound">
            <h3 v-for="obj in wordCh" :key="obj.key" align="center">{{ obj.pos }}.  {{ obj.meaning }}</h3>
          </div>
          <div class="sound">
            <label>{{ phoneticSymbol }}</label>
            <svg-icon icon-class="sound" @click="playSound()" />
            <audio id="audioElement" :src="action" @canplay="prePlay()" />
          </div>
          <div class="write-answer">
            <el-input id="inputElement" v-model="writeAnswer" placeholder="请在此处填写单词答案" suffix-icon="el-icon-edit" autofocus="true" prop="writeAnswer" clearable />
          </div>
          <div class="btn-box">
            <el-button type="primary" round @click="tip()">提示</el-button>
            <el-button type="primary" round @click="checkWord(writeAnswer)">确定</el-button>
          </div>
        </div>
      </el-col>
      <el-col v-show="dialogRight" :span="10" :offset="7">
        <div class="grid-content bg-purple">
          <div class="number"><span>{{ nowPosition + 1 }}</span>/{{ totalNum }}</div>
          <div class="picture">
            <img src="../../../assets/study/resultA.png">
            <h3 class="resultA">回答正确</h3>
          </div>
          <div class="answer">
            <h3>{{ answer }}</h3>
            <label>{{ phoneticSymbol }}</label>
            <i class="el-icon-video-play" />
          </div>
          <div class="btn-box">
            <el-button type="primary" round @click="nextWord()">{{ nextWordText }}</el-button>
          </div>
        </div>
      </el-col>
      <el-col v-show="dialogWrong" :span="10" :offset="7">
        <div class="grid-content bg-purple">
          <div class="number"><span>{{ nowPosition + 1 }}</span>/{{ totalNum }}</div>
          <div class="picture">
            <img src="../../../assets/study/resultB.png">
            <h3 class="resultB">回答错误</h3>
          </div>
          <div class="answer">
            <h3>{{ answer }}</h3>
            <label>{{ phoneticSymbol }}</label>
            <i class="el-icon-video-play" />
          </div>
          <div class="btn-box">
            <el-button type="primary" round @click="nextWord()" @keyup.esc="KeyUpEsc">{{ nextWordText }}</el-button>
          </div>
        </div>
      </el-col>
      <el-col v-show="dialogResult" :span="10" :offset="7">
        <div class="grid-content bg-purple">
          <ul class="result">
            <li><h1><span>{{ rightNum }}</span>个</h1><h3 align="center">回答正确</h3></li>
            <li><h1><span>{{ totalNum - rightNum }}</span>个</h1><h3 align="center">回答错误</h3></li>
            <li><el-progress type="circle" :percentage="correctness" /><h3 align="center">正确率</h3></li>
          </ul>
          <div class="btn-box">
            <el-button type="primary" round @click="nextStudy()">继续学习</el-button>
          </div>
        </div>
      </el-col>
      <el-col v-show="dialogFinish" :span="12" :offset="6">
        <div class="grid-content bg-purple" style="text-align: center;">
          <img width="300" src="../../../assets/study/word-done.png">
          <h3 align="center">本书已学完</h3>
          <div class="btn-box">
            <el-button type="primary" round @click="reStudy()">重新学习</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { selectWords, addStudy, reStudy, addStudyLog } from '@/api/study'

export default {
  data() {
    return {
      oriAction: 'http://dict.youdao.com/dictvoice?audio=',
      action: '',
      audio: '',
      tmId: undefined,
      chapterId: undefined,
      correctness: 0,
      rightNum: 0,
      wrongNum: 0,
      nextWordText: '下一个单词',
      dialogTip: false,
      dialogWrite: false,
      dialogRight: false,
      dialogWrong: false,
      dialogResult: false,
      dialogFinish: false,
      nowPosition: 0,
      totalNum: 1,
      answer: 'book',
      writeAnswer: '',
      phoneticSymbol: '[bʊk]',
      studyDetail: '',
      tempStudyDetail: [],
      wordCh: [
        {
          pos: 'n',
          meaning: '书籍',
          key: Date.now()
        },
        {
          pos: 'vt',
          meaning: '预定',
          key: 1558403714493
        }
      ],
      items: undefined
    }
  },
  created() {
    var _this = this
    document.onkeydown = function(e) {
      const key = window.event.keyCode
      if (key === 13) {
        if (_this.dialogWrite) {
          _this.checkWord(_this.writeAnswer)
          return
        }
        if (_this.dialogRight) {
          _this.nextWord()
          return
        }
        if (_this.dialogWrong) {
          _this.nextWord()
          return
        }
        if (_this.dialogResult) {
          _this.nextStudy()
          return
        }
        if (_this.dialogFinish) {
          _this.reStudy()
          return
        }
      } else if (key === 8) {
        if (_this.dialogWrite) {
          document.getElementById('inputElement').focus()
          return
        }
      }
    }
    this.tmId = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      selectWords(this.tmId).then(response => {
        this.items = response.data
        if (Array.isArray(this.items) && this.items.length === 0) {
          this.$message({
            message: '教材不完整',
            type: 'warning'
          })
          return
        }
        if (!this.items) {
          this.dialogTip = false
          this.dialogWrite = false
          this.dialogRight = false
          this.dialogWrong = false
          this.dialogRight = false
          this.dialogResult = false
          this.dialogFinish = true
          return
        }
        this.totalNum = this.items.length
        this.chapterId = this.items[0].chapterId
        this.nextChapter()
        this.initPage(this.items, 0)
      })
    },
    tip() {
      if (this.dialogTip) {
        this.dialogTip = false
      } else {
        this.dialogTip = true
      }
    },
    checkWord(param) {
      if (!param) {
        this.$message({
          message: '请填写单词',
          type: 'warning'
        })
        return
      }
      if (this.answer === this.writeAnswer) {
        this.dialogTip = false
        this.dialogWrite = false
        this.dialogRight = true
        this.dialogWrong = false
        this.rightNum += 1
      } else {
        this.dialogTip = false
        this.dialogWrite = false
        this.dialogRight = false
        this.dialogWrong = true
        this.wrongNum += 1
      }
      if ((this.nowPosition + 1) === this.totalNum) {
        this.nextWordText = '查看学习结果'
      }
      this.addStudyLog()
    },
    addStudyLog() {
      const temp = {
        isTip: this.dialogTip,
        answer: this.answer,
        writeAnswer: this.writeAnswer,
        isRight: this.dialogRight
      }
      this.tempStudyDetail.push(temp)
      this.studyDetail = JSON.stringify(this.tempStudyDetail)
    },
    prePlay() {
      this.action = this.oriAction + this.answer
      this.audio = document.getElementById('audioElement')
    },
    playSound() {
      this.audio.play()
    },
    nextWord() {
      if ((this.nowPosition + 1) === this.totalNum) {
        this.showResult()
      } else {
        this.nextPage()
      }
    },
    showResult() {
      this.correctness = Number((this.rightNum * 100 / this.totalNum).toFixed(0))
      this.dialogResult = true
      this.dialogRight = false
      this.dialogWrong = false
      this.postResult()
    },
    postResult() {
      const temp = {
        tmId: this.tmId,
        chapterId: this.chapterId,
        correctness: this.correctness,
        totalNum: this.totalNum,
        rightNum: this.rightNum
      }
      addStudy(temp).then(response => {
        console.log(response.message)
      })
      const tempLog = Object.assign({}, temp)
      tempLog['studyDetail'] = this.studyDetail
      addStudyLog(tempLog).then(response => {
        console.log(response.message)
        this.tempStudyDetail = []
      })
    },
    nextPage() {
      this.nowPosition += 1
      this.initPage(this.items, this.nowPosition)
    },
    nextChapter() {
      this.rightNum = 0
      this.wrongNum = 0
      this.correctness = 0.00
      this.writeAnswer = ''
    },
    nextStudy() {
      this.fetchData()
    },
    reStudy() {
      reStudy(this.tmId).then(response => {
        this.fetchData()
      })
    },
    initPage(item, pos) {
      this.nowPosition = pos
      this.phoneticSymbol = item[pos].wordPhoneticSymbol
      this.answer = item[pos].wordEn
      this.wordCh = JSON.parse(item[pos].wordCh)
      this.dialogWrite = true
      this.dialogTip = false
      this.dialogRight = false
      this.dialogWrong = false
      this.dialogResult = false
      this.dialogFinish = false
      this.writeAnswer = ''
      this.prePlay()
    }
  }
}
</script>

<style scoped>
body{
  background-color: #f2f2f2;
}
dl{
  margin: 0;
}
/* 背单词 */
.bg-purple {
background: #ffffff;
box-shadow: 0 5px 17px rgba(0,0,0,.1);
}
.grid-content {
border-radius: 6px;
min-height: 36px;
padding: 12px 20px 30px;
}
.grid-content .number{
  font-size: 14px;
  margin-bottom: 12px;
}
.grid-content .number span{
   font-size: 36px;
   color: #409EFF;
}
.grid-content .picture{
  text-align: center;
  margin-bottom: 12px;
}
.grid-content .picture img{
  width: 220px;
  height: 220px;
}
.grid-content .sound{
  text-align: center;
  /*font-size: 18px;*/
  margin-bottom: 12px;
}
.grid-content .sound .svg-icon{
   color: #409EFF;
   /*font-size: 20px;*/
   margin-left: 4px;
   cursor: pointer;
}
.grid-content .sound label{
  font-weight: normal;
  color: #999999;
  }
.grid-content .select-box  dd{
  margin: 0 20px 20px 20px;
  }
.grid-content .select-box  dd .el-radio.is-bordered{
  width: 100%;
  border-radius: 40px;
}
.grid-content .btn-box{
  text-align: center;
}
.grid-content .write-answer{
  height: 220px;
  line-height: 220px;
  margin: 0px 20px 20px 20px;
}
.grid-content .picture h3{
  text-align: center;
  margin: 0;
}
.grid-content .picture h3.resultA{
  color: #67c23a;
}
.grid-content .picture h3.resultB{
  color: #f56c6c;
}
.grid-content .answer{
  height: 205px;
  margin: 0px 20px 20px 20px;
  text-align: center;
}
.grid-content .answer label{
  font-weight: normal;
  color: #999999;
  }
.grid-content .answer h3{
  padding: 60px 0 0 0;
}
.grid-content .result{
  display: flex;
  }
.grid-content .result li{
  list-style: none;
  flex: 1;
  text-align: center;
}
.grid-content .result li h1{
  margin: 0;
  line-height: 130px;
  height: 130px;
  font-size: 16px;
  font-family: "微软雅黑";
  font-weight: normal;
}
.grid-content .result li h1 span{
  font-size: 42px;
}
.grid-content .result li:first-child span{
  color: #81d842;
}
.grid-content .result li:nth-child(2) span{
  color: #f75353;
}
.grid-content .result li h3{
  font-size: 16px;
  font-family: "微软雅黑";
  font-weight: normal;
}
</style>
