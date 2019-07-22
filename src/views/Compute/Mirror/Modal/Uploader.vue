<template>
  <uploader
    class="uploader-example"
    ref="uploader"
    :options="options"
    :autoStart="true"
    :file-status-text="statusText"
    @file-added="onFileAdded"
    @file-success="onFileSuccess"
    @file-progress="onFileProgress"
    @file-error="onFileError"
  >
    <uploader-unsupport></uploader-unsupport>
    <uploader-drop>
      <uploader-btn>select files</uploader-btn>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
import Vue from 'vue';
import SparkMD5 from "spark-md5";
import qs from 'qs'
import { LOGINFO, ACCESS_TOKEN } from "@/store/mutation-types";import notification from "ant-design-vue/es/notification";
import { clearToken } from '@/utils/util';
let token = Vue.ls.get(LOGINFO)[ACCESS_TOKEN];
export default {
  data() {
    return {
      options: {
        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
        target: "/cmp/v1/upload/chunk/mirrorimage",
        testChunks: false,
        chunkSize: 2 * 1024 * 1000 + '',  // 单位 kb
        testMethod: "POST",
        fileParameterName: "file",
        // testChunks: true, //是否开启秒传
        maxChunkRetries: 3,
        headers: {
          'X-Token': token,
        },
        // simultaneousUploads: 30,
        // checkChunkUploadedByResponse: function(chunk, message) {
        //   console.log(chunk)
        //   return false;
        //   // let objMessage = JSON.parse(message);
        //   // if (objMessage.skipUpload) {
        //   //   return true;
        //   // }
        //   // return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
        // },
        // processResponse (resp, cb) {
        //   console.log(resp);
        //   cb && cb(resp);
        // },
      },
      attrs: {
        accept: "image/*"
      },
      file: {

      },
      statusText: {
        success: '合并中',  // 在合并文件接口成功之后重置状态
        error: '出错了',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中',
      },
    };
  },
  computed: {
    uploader () {
      return this.$refs.uploader.uploader;
    }
  },
  methods: {
    clearFileList () {
      this.uploader.fileList.forEach(item => this.uploader.removeFile(item));
      this.statusText.success = '合并中';
    },
    onFileAdded(file) {
      // 移除之前的文件，只保留当前文件
      this.uploader.fileList
        .filter(item => item !== file)
        .forEach(item => this.uploader.removeFile(item));
      this.file.url = '';
      this.file.MD5 = '';
      this.computeMD5(file);
    },
    onFileProgress(rootFile, file, chunk) {
      // console.log(
      //   `上传中 ${file.name}，chunk：${chunk.startByte /
      //     1024 /
      //     1024} ~ ${chunk.endByte / 1024 / 1024}`
      // );
    },
    onFileSuccess(rootFile, file, response, chunk) {
      this.$http({
        method: 'post',
        url: '/cmp/v1/upload/chunk/merge/mirrorimage',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
          filename: file.name,
          fileMd5: this.file.md5,
          totalSize: file.size,
          totalChunks: file.chunks.length,
        }) ,  // 直接提交转换后的数据即可
      })
      .then(resp => {
        this.file.url = resp.data.filePath[0].url;
        this.statusText.success = '成功';
      })
      .catch(err => {
        this.$message.error(err.response.data.desc)
      })
      return;
    },
    onFileError(rootFile, file, response, chunk) {
      let res = JSON.parse(response);
      if (res && [401, 404].includes(res.status)) {
        notification.error({ message: "请登录", description: "" });
        clearToken();
        this.$router.push({ name: 'login' })
      }
    },
    /**
     * 计算md5，实现断点续传及秒传
     * @param file
     */
    computeMD5(file) {
      let fileReader = new FileReader();
      let time = new Date().getTime();
      let md5 = "";
      file.pause();

      fileReader.readAsArrayBuffer(file.file);
      fileReader.onload = e => {
        if (file.size != e.target.result.byteLength) {
          this.error(
            "Browser reported success but could not read the file until the end."
          );
          return;
        }

        md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
        this.file.md5 = md5;
        // 添加额外的参数
        this.uploader.opts.query = ((md5, that)=>{
          return (uploader, chunk) => {
            const chunkMd5 = SparkMD5.ArrayBuffer.hash(chunk.bytes);
            return { chunkMd5, fileMd5: md5 }
          }
        })(md5, this);
        // console.log(this.$refs.uploader)
        // console.log(`MD5计算完毕：${file.id} ${file.name}`);
        // console.log(`MD5：${md5}`);
        // console.log(`用时：${new Date().getTime() - time} ms`);
        // file.uniqueIdentifier = md5;
        file.resume();
      };
      fileReader.onerror = function() {
        this.error(
          "FileReader onerror was triggered, maybe the browser aborted due to high memory usage."
        );
      };
    },
    fileListShow() {
      let $list = $("#global-uploader .file-list");
      if ($list.is(":visible")) {
        $list.slideUp();
        this.collapse = true;
      } else {
        $list.slideDown();
        this.collapse = false;
      }
    },
    close() {
      this.$refs.uploader.cancel();
      this.panelShow = false;
    },
    error(msg) {
      this.$message.error(msg);
    }
  }
};
</script>

<style>
.uploader-example {
  /* width: 880px; */
  margin: 0 auto;
  font-size: 12px;
  border-radius: 4px;
    overflow: hidden;
    border: 1px solid #ccc;
}
.uploader-file {
  border: none;
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-drop {
  border: none;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
