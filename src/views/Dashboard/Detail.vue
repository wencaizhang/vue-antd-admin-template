<template>
  <section class="detail" :style="{ color: this.data.color }">
     <ul>
       <li
        v-for="item in data.children"
        :key="item.text"
       >
        <i class="icon"></i>
        <span class="text">{{ item.text }}</span>
        <span class="value">{{ item.value }}</span>
       </li>
     </ul>
  </section>
</template>

<script>
export default {
  name: '',
  props: {
    data: {
      type: Object,
    }
  },
  computed: {

  },
  data () {
    return {

    }
  },
  methods: {

  },
}
</script>

<style scoped>
.detail {
  color: red;
  box-shadow: 2px 2px 2px  #ededed;
  display: inline-block;
  padding: 5px;
}
li {
  display: table-row;
}
li .icon {
  border: 2px solid;
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
}
li .text {
  color: #999;
  font-size: 12px;
}
li span {
  padding: 2px 10px;
  display: table-cell;
}
</style>

