<template>
  <div class="app-container">
    
    <div>
      <el-form ref="form"  label-width="180px">
        <el-form-item label="选择游戏" >
          <el-select v-model="selected_config" @change="onLoadConfig">
            <el-option v-for="item in options" :label="item.name" :key="item.id" :value="item.path"></el-option>
          </el-select>
           <!-- <el-button type="text" @click="onLoadConfig">载入</el-button> -->
        </el-form-item>
        
      </el-form>
    
    </div>
<div v-if="selected">
      <el-button type="primary" @click="onSingle">单抽</el-button>
      <el-button type="primary" @click="onTen">十连</el-button>
      <el-button type="primary" @click="onHundred">一百连</el-button>
    </div>
    <el-table :data="tableData" ref="multipleTable">
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="value" label="数值"></el-table-column>
      <el-table-column label="操作" min-width="200">
        <template scope="scope">
          <!-- <el-button type="primary" size="small" @click="editDo(scope.row)">修改</el-button> -->
          <el-button type="primary" size="small" @click="deleteDo(scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="onAdd" class="el-button">添加</el-button>
    <el-button type="primary" @click="onClear" class="el-button">清空</el-button>
    <el-dialog title="新增物品" :visible.sync="dialogTableVisible">
      <el-form ref="form" label-width="120px">
        <el-form-item label="名字" required>
          <el-input v-model="itemData.name" style="width:200px"/>
        </el-form-item>
        <el-form-item label="值(%)" required>
          <el-input v-model="itemData.value" type="number" style="width:200px"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <!-- <el-button @click="onCancel">Cancel</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="结果" :visible.sync="resultVisible">
      <el-button type="primary" @click="resultVisible=false">关闭</el-button>
      <el-button type="primary" @click="tryAgain">重抽</el-button>
      <el-table :data="result" ref="multipleTable">
        <el-table-column prop="name" label="名字">
          <template scope="scope">
            <span v-if="scope.row.value >= 1">{{scope.row.name}}</span>
            <span v-else style="color: red">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="次数"></el-table-column>
        <el-table-column prop="value" v-if="false"></el-table-column>
      </el-table>
    </el-dialog>
    <div>
      <el-upload
            style="display:inline-block"
            :limit="1"
            class="upload-demo"
            ref="upload"
            accept=".json"
            action
            :file-list="fileList"
            :http-request="uploadSectionFile"
            :on-change="onAddFiles"
            :auto-upload="false"
          >
          <el-button type="primary" @click="onOther">载入其他</el-button>
          </el-upload>
      
      <el-button type="primary" @click="output">导出</el-button>
      </div>
  </div>
</template>

<style>
.el-button {
  margin-top: 20px;
}
</style>

<script>
const allcfgs_url="";//配置的URL
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      selected:false,
      selected_config: null,
      result: [],
      options: [],
      tableData: [],
      itemData: {
        name: "",
        value: ""
      },
      dialogTableVisible: false,
      resultVisible: false,
      times: 1
    };
  },
  mounted() {},
  methods: {
    onAdd() {
      this.itemData = {};
      //  this.$router.push('/lottery/index')
      this.dialogTableVisible = true;
    },
    onOther() {},
    onLoadConfig() {
      if (this.selected_config != null) {
        this.selected=true;
        var _this = this;
        console.log(this.selected_config);
        this.$reqs.get(this.selected_config+"?"+Math.random()*1000).then(resp => {
          _this.tableData = resp.data.data;
        });
      }
    },
    onSingle() {
      this.times = 1;
      this.onMulti(1);
      // var note = {};
      // this.result = [];
      // var item = this.lotteryOne();
      // if (note[item.name] == null) {
      //   note[item.name] = {};
      //   note[item.name].name = item.name;
      //   note[item.name].count = 0;
      //   this.result.push(note[item.name]);
      // }
      // note[item.name].count += 1;

      // this.resultVisible = true;
    },
    output() {
      var json = {};
      var data = [];
      for (var i = 0; i < this.tableData.length; i++) {
        data.push(this.tableData[i]);
      }
      json.data = data;
      var a = JSON.stringify(json);
      console.log(json.data);
      var FileSaver = require("file-saver");
      var blob = new Blob([a], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "out.json");
    },
    tryAgain() {
      this.onMulti(this.times);
    },
    onTen() {
      this.times = 10;
      this.onMulti(10);
    },
    onHundred() {
      this.times = 100;
      this.onMulti(100);
    },
    onClear() {
      this.tableData = [];
      this.selected=false;
    },
    onAddFiles(file) {
      var _this = this;
      var reader = new FileReader();
      reader.onload = function() {
        let data = JSON.parse(reader.result);

        console.log(reader.result);
        _this.tableData = data.data;
        _this.selected=true;
      };
      reader.readAsText(file.raw);
    },
    onMulti(count) {
      var note = {};
      this.result = [];
      for (var i = 0; i < count; i++) {
        var item = this.lotteryOne();
        if (note[item.name] == null) {
          note[item.name] = {};
          note[item.name].name = item.name;
          note[item.name].count = 0;
          note[item.name].value = item.value;
          this.result.push(note[item.name]);
        }
        note[item.name].count += 1;
      }

      this.resultVisible = true;
    },
    editDo(data) {
      //    this.$router.push({name:'subject',params:{data:data}})
    },
    deleteDo(name) {
      var _this = this;
      let msg = "删除当前选中条目, 是否继续?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var _this = this;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].name == name) {
              this.tableData.splice(i, 1);
              break;
            }
          }
        })
        .catch(() => {});
    },
    onSubmit() {
      var data = {};
      data.name = this.itemData.name;
      data.value = this.itemData.value;
      this.tableData.push(data);
      this.selected=true;
      this.dialogTableVisible = false;
    },
    lotteryOne() {
      var pos = [];
      pos.push(0);
      var count = 0;
      for (var i = 0; i < this.tableData.length; i++) {
        count += parseFloat(this.tableData[i].value);
        pos.push(count);
      }
      var ran = Math.random() * 100;
      for (var i = 0; i < pos.length - 1; i++) {
        if (ran >= pos[i] && ran < pos[i + 1]) {
          break;
        }
      }
      return this.tableData[i];
    }
  },
  created() {
    var _this = this;
    this.$reqs.get(allcfgs_url+Math.random()*1000).then(resp => {
      console.log(resp.data.data);
      _this.options = resp.data.data;
    });
  }
};
</script>