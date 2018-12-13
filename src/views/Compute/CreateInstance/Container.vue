<template>
  <div>
    <page-layout>
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
      </a-steps>
      <div class="steps-content">
        <Step0 v-show="current === 0" ref="content0" @next="nextStep" @submit="submitHandle"/>
        <Step1 v-show="current === 1" ref="content1" @next="nextStep" @submit="submitHandle"/>
        <Step2 v-show="current === 2" ref="content2" @next="nextStep" @submit="submitHandle"/>
        <Step3 v-show="current === 3" ref="content3" @next="nextStep" @submit="submitHandle"/>
      </div>
      <div class="steps-action">
        <a-button v-if="current>0" @click="prev">上一步</a-button>
        <a-button
          style="margin-left: 8px"
          v-if="current == steps.length - 1"
          type="primary"
          @click="handleNextClick"
        >创建</a-button>
        <a-button
          v-if="current < steps.length - 1"
          style="margin-left: 8px"
          type="primary"
          @click="handleNextClick"
        >下一步</a-button>
      </div>
    </page-layout>
  </div>
</template>
<script>
import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import PageLayout from "@/components/Layout/PageLayout.vue";

export default {
  components: { Step0, Step1, Step2, Step3, PageLayout },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "选择映像",
          name: "step1"
        },
        {
          title: "配置选择",
          name: "step2"
        },
        {
          title: "网络设置",
          name: "step3"
        },
        {
          title: "基本信息",
          name: "step4"
        }
      ],
      values: {},
      forms: []
    };
  },
  methods: {
    submitHandle(payload) {
      Object.assign(this.values, payload);
      console.log(this.values);
      this.$message.success("创建成功！");

      this.$router.push({ name: 'instance' })
    },
    nextStep(payload) {
      this.current++;
      Object.assign(this.values, payload);
    },
    handleNextClick() {
      this.$refs["content" + this.current].submitForm();
    },
    nextFunction() {
      const ref = this.$refs.content.submitForm();
      if (step1) {
        this.current++;
      }
      return false;
      this.forms[this.current].validateFields((err, values) => {
        if (!err) {
          if (this.current === 1) {
            // 硬盘需要单独处理
            if (!this.selectedDiskRowKeys.length) {
              this.$message.warn("请至少选择一个硬盘");
              return false;
            }
            this.values.push(
              Object.assign({}, values, { selectedDiskRowKeys })
            );
          } else if (this.current === 2) {
            // 网络需要单独处理
            if (!this.selectedNetworkRowKeys.length) {
              this.$message.warn("请至少选择一个私有网络");
              return false;
            }
            this.values.push({ selectedNetworkRowKeys });
          } else if (this.current === 3) {
            this.values.push(values);
            // 已经是最后一步，进行提交
            this.submitHandle();
            return false;
          } else {
            this.values.push(values);
          }

          this.current++;
        }
      });
    },
    prev() {
      this.current--;
    }
  }
};
</script>
<style>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 20px;
}

.ant-form-item-control {
  text-align: left;
}

.steps-action {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}
</style>