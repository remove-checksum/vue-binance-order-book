<template>
  <div style="padding-top: 20px">
    {{ nagMsg }}
  </div>
</template>

<script>
export default {
  name: 'Nag',
  data() {
    return {
      nagMsg: '',
      hasMsg: false,
    };
  },
  created() {
    this.$bus.$on('test-evt', (msg) => this.nag(msg));
  },
  methods: {
    nag(msg) {
      if (this.hasMsg) {
        this.msg = '';
        this.hasMsg = !this.hasMsg;
      } else if (!this.hasMsg) {
        this.hasMsg = !this.hasMsg;
        this.nagMsg = msg;
      }
    },
  },
};
</script>
