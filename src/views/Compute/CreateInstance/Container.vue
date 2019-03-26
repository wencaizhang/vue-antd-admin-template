<template>
  <div>
    <page-layout>
      <a-steps :current="currStepIndex">
        <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
      </a-steps>
      <div class="steps-content">
        <Step0
          v-show="currStepIndex === 0"
          ref="content0" 
          @setDefaultUserName="setDefaultUserName"
        />
        <Step1
          v-show="currStepIndex === 1"
          ref="content1" />
        <Step2
          v-show="currStepIndex === 2"
          ref="content2" />
        <Step3
          v-show="currStepIndex === 3"
          ref="content3" 
          :defaultUserName="defaultUserName"
        />
      </div>
      <div class="steps-action">
        <a-button v-if="currStepIndex>0" @click="handlePrevClick">上一步</a-button>
        <a-button
          style="margin-left: 8px"
          v-if="currStepIndex == steps.length - 1"
          type="primary"
          :loading="createLoading"
          @click="handleNextClick"
        >创建</a-button>
        <a-button
          v-if="currStepIndex < steps.length - 1"
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

import { createInstance } from "@/api/compute/instance";

export default {
  components: { Step0, Step1, Step2, Step3, PageLayout },
  data() {
    return {
      currStepIndex: 0,
      createLoading: false,
      steps: [
        { title: "选择映像", name: "step1" },
        { title: "配置选择", name: "step2" },
        { title: "网络设置", name: "step3" },
        { title: "基本信息", name: "step4" },
      ],
      formValueCollection: {},
      defaultUserName: '',
    };
  },
  methods: {
    async handleCreateInstance () {
      this.createLoading = true;
      try {
        const resp = await createInstance(this.formValueCollection);
        this.$message.success("创建成功！");
        this.$router.push({ name: "instance" });
      } catch (error) {
        
      } finally {
        this.createLoading = false;
      }

    },
    async handleNextClick() {
      try {
        const currFormValues = await this.$refs["content" + this.currStepIndex].handleSubmit();
        console.log('currFormValues', currFormValues)
        Object.assign(this.formValueCollection, currFormValues);
        
        if (this.steps.length === this.currStepIndex + 1) {
          this.handleCreateInstance();
        } else {
          this.currStepIndex++
        }

      } catch (error) {
        
      }
    },
    handlePrevClick() {
      if (this.currStepIndex > 0) {
        this.currStepIndex--
      };
    },
    setDefaultUserName (defaultUserName) {
      this.defaultUserName = defaultUserName;
    }
  }
};
</script>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  /* text-align: center; */
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
