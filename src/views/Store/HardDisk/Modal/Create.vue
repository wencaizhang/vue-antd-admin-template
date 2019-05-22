<template>
  <div>
    <a-modal
      @cancel="handleCancel"
      @ok="handleCreate"
      :bodyStyle="bodyStyle"
      :visible="visible"
      :confirmLoading="confirmLoading"
      title="创建硬盘"
      okText="保存"
    >
      <a-form :form="form" >
        <a-form-item
          class="the-form-item-for-position"
          label="名称"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'name',
              {
                rules: [
                  { required: true, message: '请输入名称' },
                  rulesObj.name
                ]
              }
            ]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="描述："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-textarea
            placeholder="请输入描述"
            v-decorator="[
              'description',
              {
                rules: [
                  rulesObj.desc,
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="数量："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="1"
            v-decorator="[
              'number',
              {
                rules: [{ required: true, message: '请输入数量' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="硬盘来源："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            :getPopupContainer="getPopupContainer"
            @select="onSelectResourceType"
            v-decorator="[
              'resourceType',
              {
                initialValue: 0,
                rules: [
                  { required: true, message: '请选择硬盘来源' },
                ]
              }
            ]"
          >
            <a-select-option
              v-for="item in resourceType"
              :key="item.id"
              :value="item.value"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="source && source != 0"
          :label="'请选择' + formItemData.name"
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <!-- 此 item 根据硬盘来源进行变化 -->
          <a-spin :spinning="formItemData.loading">
            <a-select
              :getPopupContainer="getPopupContainer"
              @select="onSelectResource"
              v-decorator="[
                'resource',
                {
                  rules: [
                    { required: true, message: `请选择${formItemData.name}` },
                  ]
                }
              ]"
            >
              <a-select-option
                v-for="item in formItemData.options"
                :key="item.id"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-spin>
        </a-form-item>
        <a-form-item
          label="类型："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-radio-group
            v-decorator="[
              'volumeType',
              {
                initialValue: volumeType,
                rules: [{ required: true, message: '请选择硬盘类型' }]
              }
            ]"
          >
            <a-radio v-if="!volumeType || volumeType === 'hdd'" value="hdd">普通</a-radio>
            <a-radio v-if="!volumeType || volumeType === 'ssd'" value="ssd">SSD</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="容量："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-input-number
            :min="formItemData.capacity.min"
            :max="formItemData.capacity.max"
            v-decorator="[
              'capacity',
              {
                rules: [{ required: true, message: '请输入容量' }]}
            ]"
          />
        </a-form-item>
        <a-form-item
          label="购买时长："
          :labelCol="formItemLayout.labelCol"
          :wrapperCol="formItemLayout.wrapperCol"
        >
          <a-select
            :getPopupContainer="getPopupContainer"
            v-decorator="[
              'buyLength',
              {
                rules: [{ required: true, message: '请选择购买时长' }]}
            ]"
          >
            <a-select-option :value="1">1个月</a-select-option>
            <a-select-option :value="2">2个月</a-select-option>
            <a-select-option :value="3">3个月</a-select-option>
            <a-select-option :value="6">半年</a-select-option>
            <a-select-option :value="12">1年</a-select-option>
            <a-select-option :value="24">2年</a-select-option>
            <a-select-option :value="36">3年</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-row>
        <a-col :span="12" :offset="8">配置费用： ￥10.00</a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { baseModalMixins, formModalMixins } from "@/mixins/modalMixin";

import {
  createDisk as fetchAPI,
  getDiskList,
  getSnapshootList,
  getBackupList,
  restoreBackup,
  getDiskDetail
} from "@/api/store/disk";
import { getImageList } from "@/api/compute/images";
import { rulesObj } from "@/utils/util";
export default {
  mixins: [baseModalMixins, formModalMixins],
  data() {
    return {
      rulesObj,
      fetchAPI,
      name: "create",
      source: "0",
      volumeType: "",
      // 硬盘来源类型[0:空白硬盘 1:快照 2:备份 3:硬盘 4:镜像]
      resourceType: [
        {
          value: 0,
          name: "空白硬盘",
          id: "blank",
          loading: false,
          options: [],
          capacity: {
            min: 10,
            max: 4000
          }
        },
        {
          value: 1,
          name: "快照",
          id: "snapshoot",
          loading: false,
          options: [],
          capacity: {
            min: 20
          }
        },
        {
          value: 2,
          name: "备份",
          id: "backup",
          loading: false,
          options: [],
          capacity: {
            min: 100
          }
        },
        {
          value: 3,
          name: "硬盘",
          id: "disk",
          loading: false,
          options: [],
          capacity: {
            min: 100
          }
        },
        {
          value: 4,
          name: "镜像",
          id: "mirror",
          loading: false,
          options: [],
          capacity: {
            min: 10,
            max: 4000
          }
        }
      ]
    };
  },
  computed: {
    formItemData() {
      const key = Number.parseInt(this.source);
      return this.resourceType[key];
    },
  },
  methods: {
    initFormValues() {
      this.source = "0";
      this.formValues = { configCost: 5 };
      this.confirmLoading = false;
    },
    onShow() {
      this.initFormValues();
      this.fetch();
    },
    async fetchItem(item) {
      const re = this.resourceType.find(item2 => item2.id === item.id);
      re.loading = true;
      try {
        const resp = await item.api();
        if (item.id === "mirror") {
          // 镜像列表中容量字段以字节为单位，修改为以 G 为单位
          resp.data.forEach(
            item =>
              (item.capacity = Math.ceil(item.capacity / 1024 / 1024 / 1024))
          );
        }
        if (item.id === "disk") {
          // 硬盘列表中硬盘类型字段是 type，和其他列表保持一致改为 volumeType
          resp.data.forEach(item => (item.volumeType = item.type));
        }
        re.options = resp.data;
      } catch (error) {
      } finally {
        re.loading = false;
      }
    },
    fetch() {
      const apis = [
        { id: "disk", api: getDiskList },
        { id: "snapshoot", api: getSnapshootList },
        { id: "backup", api: getBackupList },
        { id: "mirror", api: getImageList }
      ];
      apis.forEach(item => {
        this.fetchItem(item);
      });
    },
    getPopupContainer() {
      return document.querySelector(".the-form-item-for-position");
    },
    onSelectResourceType(v) {
      this.source = v;
      this.volumeType = "";
      this.form.setFieldsValue({
        resource: ""
      });
    },
    onSelectResource(id) {
      const { options, capacity } = this.formItemData;
      const currItem = options.find(item => item.id === id);
      this.volumeType = currItem.volumeType;
      this.form.setFieldsValue({
        volumeType: currItem.volumeType
      });
      capacity.min =
        currItem.capacity > capacity.min ? currItem.capacity : capacity.min;
    },
    handleCreate() {
      const self = this;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          self.formValues = Object.assign({}, self.formValues, values);
          if (self.formValues.resourceType !== 2) {
            self.handleFetch();
          } else {
            self.formValues.resourceType = 0;
            self.createEmptyDisk();
          }
        }
      });
    },

    async createEmptyDisk() {
      this.confirmLoading = true;
      try {
        const payload = Object.assign({}, this.formValues, {});
        const resp = await fetchAPI(payload);
        this.formValues.diskCount = this.formValues.number;
        resp.data.forEach(item => {
          this.traceDiskStatus(item);
        });
      } catch (error) {
        this.confirmLoading = false;
      }
    },

    async traceDiskStatus(currItem) {
      try {
        const resp = await getDiskDetail(currItem.id);
        const currStatus = resp.hardDisk.status;
        if (currStatus.includes("ing")) {
          this.traceDiskStatus(currItem);
        } else {
          // 将数据覆盖到新建硬盘上
          const payload = {
            backupId: this.formValues.resource,
            volumeId: currItem.id
          };
          this.coverDisk(payload);
        }
      } catch (error) {}
    },
    async coverDisk(payload) {
      try {
        const resp = await restoreBackup(payload);
        this.openNotification(resp);
      } catch (error) {
        console.log(error);
      } finally {
        this.formValues.diskCount--;
        if (this.formValues.diskCount === 0) {
          this.confirmLoading = false;

          this.handleRefreshParentTable();
          this.handleCancel();
        }
      }
    },

  }
};
</script>
