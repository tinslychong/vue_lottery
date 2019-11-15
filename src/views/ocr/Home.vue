<template>
  <div class="app-container">
    <el-form  label-width="120px">
      <el-form-item label="上传图片" required>
      <el-upload
        ref="upload"
        action="#"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        list-type="picture-card"
        :limit=1
        :auto-upload="false"
        :on-change="onAddFiles">
        
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <!-- <el-form-item>
      <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
    </el-form-item> -->
     <el-form-item label="结果" required>
        <el-input v-model="result" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tesseract from 'tesseract.js'

export default {
  name: 'PageHome',
  data() {
  	return {
  		progress: null,
  		result: '',
      picUploadUrl: '',
      hasPic: false,
      lang: 'eng',
      langOptions: [
        {label: 'English', value: 'eng'},
        {label: 'Portuguese', value: 'por'}
      ]
  	}
  },
  mounted() {
  	console.log(Tesseract.workerOptions)
    let workerPath = Tesseract.workerOptions.workerPath.replace('dist/worker.dev', 'worker')
    Tesseract.workerOptions.workerPath = workerPath
    Tesseract.workerOptions.langPath = workerPath.replace(/worker.*/, 'tessdata/')
    Tesseract.workerOptions.corePath = workerPath.replace(/worker.*/, 'tesseract.js-core.js')
    console.log(Tesseract.version);
  },
  methods : {
    onAddFiles(file) {
       this.recognize(file.raw)
    },
    recognize(img) {
      
  		Tesseract.recognize(img, { 
        lang: this.lang
      }).progress(message => {
	    	console.log(message)
	    	this.progress = message.progress * 100
        // this.$q.loading.show({
        //   message: message.status,
        // })
	    })
	    .catch()
	    .then(result => {
        this.result = result.text
        var cellWidth=466/9;
        var cellHeight=466/9;
        var items=[];
         for(var i=0;i<81;i++)
      {
        items[i]=0;
        
      }
        for(var i=0;i<result.lines.length;i++)
        {
          var words=result.lines[i].words;
          for(var j=0;j<words.length;j++)
          {
            var text=words[j].text;
            var bbox=words[j].bbox;
            var startX=Math.floor(bbox.x0/cellWidth);
            var startY=Math.floor(bbox.y0/cellHeight);
            for(var k=0;k<text.length;k++)
            {
              var str=text.substr(k,1);
              var num=parseInt(str);
              var idx=startY*9+startX+k;
              items[idx]=num;
            }
            
          }
        }
        console.log(items);    
	    })
  	}
  }
}
</script>

<style scoped>
textarea {
	overflow-y: auto !important;
}
.my-gutter>div {
  padding: 4px;
}
</style>