<!--  -->
<template>
<div id="app">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="nodeName" label="node name" />
        <el-table-column prop="nodeType" label="node type" />
        <el-table-column prop="nodeLatency" label="node latency" />
        <el-table-column prop="nodeMining" label="node mining" />
        <el-table-column prop="nodePeers" label="node peers" />
        <el-table-column prop="lastBlock" label="last block" />
        <el-table-column prop="totalDifficulty" label="total difficulty" />
        <el-table-column prop="blockTransactions" label="block transactions" />
        <el-table-column prop="blockUncles" label="block uncles" />
        <el-table-column prop="lastBlockTime" label="last block time" />
        <el-table-column prop="propagationTime" label="propagation time" />

    </el-table>
    <div>
        <h2 style="font-size: small">LAST BLOCKS MINERS</h2>
        <h3 style="font-size: small">{{tableData[0].lastBlockMiners1}}</h3>
        <h3 style="font-size: small">{{tableData[0].lastBlockMiners2}}</h3>

    </div>
    <el-row :gutter="20">
        <el-col :span="6">
            <div class="grid-content bg-purple">#{{tableData[0].lastBlock.toLocaleString()}}</div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">{{tableData[0].lastBlockTime}}</div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">{{tableData[0].avgBlocktime}}</div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple">{{tableData[0].avgHashrate}}</div>
        </el-col>
    </el-row>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
let websocket;
export default {
    name: 'app',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            tableData: [{
                nodeName: '',
                nodeType: '',
                nodeLatency: '',
                nodeMining: '',
                nodePeers: '',
                lastBlock: '',
                totalDifficulty: '',
                blockTransactions: '0',
                blockUncles: '0',
                lastBlockTime: '',
                propagationTime: '',
                lastBlockMiners1: '',
                lastBlockMiners2: '',
                avgBlocktime: '',
                avgHashrate: '',
            }],

        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getData() {
            setInterval(() => {
                this.tableData[0].lastBlockTime = parseInt(this.tableData[0].lastBlockTime) + 1 + "s ago";
            }, 1000);
            websocket = new WebSocket("ws://125.64.98.21:3000/primus/?_primuscb=" + new Date().getTime() + "-1");
            websocket.onopen = () => {
                websocket.send(JSON.stringify({
                    "emit": ["ready"]
                }));
            };

            websocket.onmessage = e => {
                let domData = JSON.parse(e.data);
                let emit = domData.emit;
                console.log(domData);
                if (emit && emit[0] === "init") {
                    this.tableData[0].nodeName = emit[1].nodes[0].info.name;
                    this.tableData[0].nodeType = emit[1].nodes[0].info.node;
                    this.tableData[0].nodeLatency = emit[1].nodes[0].stats.latency;
                    this.tableData[0].nodeMining = emit[1].nodes[0].stats.mining == true ? 0 : 1;
                    this.tableData[0].nodePeers = emit[1].nodes[0].stats.peers;
                    this.tableData[0].lastBlock = emit[1].nodes[0].stats.block.number;
                    this.tableData[0].lastBlockTime = Math.round((new Date().getTime() / 1000 - emit[1].nodes[0].stats.block.timestamp)) + "s ago";

                } else {
                    if (domData.action === "block") {
                        this.tableData[0].lastBlock = domData.data.block.number;
                        this.tableData[0].totalDifficulty = domData.data.block.totalDifficulty;
                        this.tableData[0].blockTransactions = domData.data.block.transactions.length;
                        this.tableData[0].blockUncles = domData.data.block.uncles.length;
                        this.tableData[0].lastBlockTime = "0s ago";
                        this.tableData[0].propagationTime = domData.data.block.propagation + " ms";
                    } else if (domData.action === "charts") {
                        this.$nextTick(() => {
                            this.tableData[0].lastBlockMiners1 = domData.data.miners[0].miner;
                            this.tableData[0].lastBlockMiners2 = domData.data.miners[1].miner;
                            this.tableData[0].avgBlocktime = domData.data.avgBlocktime.toFixed(2) + "s";
                            this.tableData[0].avgHashrate = domData.data.avgHashrate.toFixed(1) + "H/s";

                        })

                    }
                }
            }
        },

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getData();
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

// 基于准备好的dom，初始化echarts实例

// 指定图表的配置项和数据

// 使用刚指定的配置项和数据显示图表。
</script>

<style>
.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: black;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 90px;
    color: blue;
    text-align: center;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
