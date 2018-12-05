<template>
  <div class="footer">
    <div class="copyright">Copyright
      <a-icon type="copyright"/> 北京友普产品与研发部
    </div>
  </div>
</template>

<script>
export default {
  name: "basic-footer"
};
</script>

<style lang="scss" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>