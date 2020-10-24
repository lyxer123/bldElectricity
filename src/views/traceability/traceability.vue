<!--  -->
<template>
<div class=''>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="nodeName" label="节点名称" />
        <el-table-column prop="nodeType" label="节点类型" />
        <el-table-column prop="nodeLatency" label="节点延时时间" />
        <el-table-column prop="lastBlock" label="区块高度" />
    </el-table>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
let websocket;
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            tableData: [{
                nodeName: '',
                nodeType: '',
                nodeLatency: '',
                lastBlock: '',
            }]
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getData() {
            websocket = new WebSocket("ws://125.64.98.21:3000/primus/?_primuscb=" + new Date().getTime() + "-1");
            // websocket = new WebSocket("ws://125.64.98.21:6006");
            websocket.onopen = () => {
                websocket.send(JSON.stringify({
                    "emit": ["ready"]
                }));
            };

            websocket.onmessage = e => {
                let data = JSON.parse(e.data);
                let emit = data.emit;
                console.log(data);
                if (emit && emit[0] === "init") {
                    this.tableData[0].nodeName = emit[1].nodes[0].info.name;
                    this.tableData[0].nodeType = emit[1].nodes[0].info.node;
                    this.tableData[0].nodeLatency = emit[1].nodes[0].info.net;
                    this.tableData[0].lastBlock = emit[1].nodes[0].stats.block.number;
                } else {
                    if (data.action === "block") {
                        this.tableData[0].lastBlock = data.data.block.number;
                    }
                }

            }
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getData()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {

    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
