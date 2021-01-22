<template>
    <div class="security-video heiall pd20 clear txl posr" style="padding-top:10px;">
        <n-dialog ref="dialog"></n-dialog>
        <n-layer ref="layer" :layerForm="isLayerForm">
            <template slot="layerImg" v-if="state == 0">
                <div class="clear" style="max-height: 100%;overflow-y: auto;">
                    <div class="posa white cusp" style="top:-40px;right:0;">
                        <img
                            style="width:28px;"
                            class="vtm mgr10"
                            src="../assets/imgs/btn_play_share.png"
                        />发送至QQ群
                    </div>
                    <div class="txl f16 heise mgt10 lineh">
                        <p>
                            项目名称：<span class="ticket_pro_name">海口绕城公路演丰至美兰段 </span
                            >项目
                        </p>
                        <p class="posr contenteditable_box">
                            罚款原因：<span
                                class="posa contenteditable contenteditablespan"
                                contenteditable="true"
                                >2018年12月23日：</span
                            >
                        </p>
                        <p style="width:25%;margin-top:21%;" class="posr mgt10 price_box f16">
                            罚款金额：
                            <input
                                type="text"
                                value=""
                                class="f16"
                                style="width:40%; background-color: transparent;border-bottom: 1px solid #C3C3C4;height: 24px;color:#000000;"
                            />
                            <span class="posa" style="right:6%">元</span>
                        </p>
                    </div>
                    <div class="f15 lineh huise2 mgt20">
                        <p>罚款依据：</p>
                        <p>1.损坏摄像头，罚款5000元/个，并在两小时之内修复。</p>
                        <p>2.故意遮挡摄像头，罚款50元/次，每日罚款上限500元。</p>
                        <p>
                            3.损坏摄像头电源线，罚款100元/次，并在两小时之内修复，超过1小时加罚50元，每日罚款上限500元。
                        </p>
                        <p>
                            4.损坏摄像头网线，罚款100元/次，并在两小时之内修复，超过1小时加罚50元，每日罚款上限500元。
                        </p>
                        <p>5.未佩戴安全防护设备，罚款50元/次，每日罚款上限500元。</p>
                        <p>
                            备注：客观原因（如：天气恶劣、设备老化、检修等等）造成设备故障，每月三次内不做处罚，超过三次按以上违规现象处理。
                        </p>
                        <p class="txr heise f16">项目管理中心</p>
                        <p class="txr heise f16">{{ common.formatTime('', '', '', '', '', 1) }}</p>
                    </div>
                </div>
            </template>
            <template slot="layerImg" v-if="state == 1">
                <div style="width:100%;height:100%">
                    <img :src="cropperSrc" style="width:100%;height:70%;margin-bottom:3%;" />
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="备注"
                        v-model="textarea"
                    ></el-input>
                    <div class="txc sub-btn-div">
                        <span @click="submitForm" class="sub-btn">确认保存</span>
                    </div>
                </div>
            </template>
        </n-layer>
        <!-- <template v-if='listType==1'> -->
        <div
            class="posa full pd20 bdr20"
            :style="{
                zIndex: listType == 1 ? '100' : '10',
                paddingTop: '10px',
                backgroundColor: listType == 1 ? 'white' : 'transparent'
            }"
        >
            <div class="f15">
                <n-back
                    :isHide="true"
                    @backFun="recover"
                    class="vtm cusp mgr10 punish-img"
                    v-show="isFull"
                ></n-back>
                <template v-if="lastedNew">
                    <img src="../assets/imgs/safe_09.png" class="vtm mgr10 icon-img" />{{
                        lastedNew.date
                    }}
                    {{ lastedNew.content }}
                </template>
                <label class="label-More" @click="moreList">智能抓拍</label>
            </div>
            <div :class="['lt', 'security-video-l', 'posa', 'security-video-l_' + countNum]">
                <div
                    class="txc"
                    style="margin-top:20%;"
                    v-if="cameralistjson['cameralist' + countNum].length == 0"
                >
                    <img class="nodata-img" src="../assets/imgs/default_data.png" />
                    <p class="heise">暂无数据</p>
                </div>
 <EZUIKitVideo
                    ref="eZUIKitVideo"
                    :grid="countNum"
                    :authToken="accessToken"
                    @s-click="handleClick"
                    :videoList="
                        videoList.slice((page - 1) * countNum, (page - 1) * countNum + countNum)
                    "
                />
                <div
                    v-for="(item, index) in cameralistjson['cameralist' + countNum]"
                    :id="isActive == index ? 'intel_item_choose' : ''"
                    :key="index"
                    :class="[
                        isActive == index ? 'intel_item_choose blue' : '',
                        'txl',
                        'white',
                        'posa',
                        'intel_item',
                        'pd15',
                        'intel_item_' + (index + 1),
                        isFullArr['cameralist' + countNum][index] ? 'popBox' : ''
                    ]"
                    :style="{
                        visibility:
                            isFull && !isFullArr['cameralist' + countNum][index]
                                ? 'hidden'
                                : 'visible'
                    }"
                >
                    <!-- 截屏完成后执行事件 -->
                    <span class="corpper" @click="showCorpper"></span>
                    <!-- 没有截屏插件提示安装 -->
                    <span class="downloadUrl" @click="downloadUrl"></span>
                    <div class="cameras-p-div" v-show="isFull">
                        <img
                            class="img-up cusp"
                            @mousedown="start(item, { direction: 0, speed: 0 })"
                            src="../assets/imgs/btn_safe_direction_up.png"
                        />
                        <img
                            class="img-left cusp"
                            @mousedown="start(item, { direction: 2, speed: 0 })"
                            src="../assets/imgs/btn_safe_direction_left.png"
                        />
                        <img
                            class="img-right cusp"
                            @mousedown="start(item, { direction: 3, speed: 0 })"
                            src="../assets/imgs/btn_safe_direction_right.png"
                        />
                        <img
                            class="img-down cusp"
                            @mousedown="start(item, { direction: 1, speed: 0 })"
                            src="../assets/imgs/btn_safe_direction_down.png"
                        />
                    </div>
                    <p
                        class="posa video_name heise clear f14 posr"
                        @click.prevent="choosevideo(index)"
                    >
                        <span class="lt">{{ item.name }}</span>
                        <img
                            src="../../static/img/btn_model_all.png"
                            class="posa cusp"
                            style="right:10px;top:7px;width:35px;height:35px;"
                            v-show="!isFull"
                            @click.prevent="bigvideoFun(item, index)"
                        />
                    </p>
                    <div @click="cropper()" class="video-foot">
                        <img
                            :class="classShot[0]"
                            class="vtm"
                            src="../../static/img/safe_22.png"
                        /><span :class="classShot[1]">截屏</span>
                    </div>
                    <!-- <div class="videoZ posa cusp" :style="{display:(detectFlash() && isforbid()? 'block' : 'none')}" @click.prevent="choosevideo(index)" @dblclick.prevent="bigvideoFun(item,index)">
          </div> -->
                </div>
            </div>
            <div class="rt security-video-r posa bdr20 wtbg posr">
                <div class="security-video-r-box txl">
                    <el-tree
                        class="security-tree"
                        :data="cameralistr"
                        :props="defaultProps"
                        :highlight-current="true"
                        :default-expand-all="true"
                        @node-click="handleNodeClick"
                    >
                    </el-tree>
                </div>
                <div class="posa wall txc postb0">
                    <img
                        class="mgr10 cusp"
                        src="../assets/imgs/safe_12.png"
                        @click="changeFun(4)"
                    />
                    <img
                        class="mgr10 cusp"
                        src="../assets/imgs/safe_13.png"
                        @click="changeFun(9)"
                    />
                    <img
                        class="mgr10 cusp"
                        src="../assets/imgs/safe_14.png"
                        @click="changeFun(16)"
                    />
                </div>
            </div>
        </div>
        <!-- </template> -->
        <!-- <template v-if='listType==2'> -->
        <div
            class="posa full pd20 bdr20"
            :style="{
                zIndex: listType == 1 ? '10' : '100',
                paddingTop: '10px',
                backgroundColor: listType == 1 ? 'transparent' : 'white'
            }"
        >
            <n-back :isHide="true" @backFun="backFun" class="vtm"></n-back>
            <n-times @changeTime="changeTime" class="mgl30"></n-times>
            <div class="comm-btn disi vtb addButton mgl10" @click="addFun()" v-if="tableList[0]">
                批量删除
            </div>
            <div class="p-inf-main txc" style="top:70px;">
                <el-table
                    class="el-table-target"
                    :data="tableList"
                    style="width: 100%;height:100%;"
                    height="0.1"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column align="center" type="selection" width="120"></el-table-column>
                    <el-table-column
                        align="center"
                        type="index"
                        width="120"
                        label="序号"
                        :index="ind => common.indexMethod(ind, $data)"
                    ></el-table-column>
                    <el-table-column align="center" width="130" label="截图">
                        <template slot-scope="scope"
                            ><img
                                :src="scope.row.rcontent ? scope.row.rcontent : ''"
                                style="width:100px;height:50px;cursor:pointer;"
                                @click="lookbidgQrCode(scope.row.rcontent)"
                        /></template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        width="240"
                        prop="date"
                        label="时间"
                    ></el-table-column>
                    <el-table-column align="center" prop="content" label="内容"></el-table-column>
                </el-table>
            </div>
            <el-pagination
                class="m-pagination el-pagination-person"
                background
                layout="prev, pager, next"
                :page-size="10"
                @current-change="getList"
                :current-page.sync="currentPage"
                :total="totalcount"
            ></el-pagination>
        </div>
        <!-- </template> -->
    </div>
</template>
<style scoped lang="scss">
.label-More {
    display: inline-block;
    width: 80px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: white;
    cursor: pointer;
    border-radius: 15px;
    background: linear-gradient(to right, #2180ff, #77d3ff);
}

.span-screenshot1 {
    position: absolute;
    right: 26px;
    bottom: 11px;
    color: #75aaff;
}

.span-screenshot2 {
    position: absolute;
    right: 20px;
    bottom: 6px;
    color: #75aaff;
    display: none;
}

.screenshot1 {
    position: absolute;
    right: 60px;
    bottom: 4px;
    z-index: 10;
    cursor: pointer;
}

.screenshot2 {
    position: absolute;
    display: none;
    right: 60px;
    bottom: 4px;
    z-index: 10;
    cursor: pointer;
}

.contenteditablespan {
    width: 100%;
    height: 120px;
    text-indent: 13%;
    left: 0;
    display: inline-block;
    margin-top: 0;
    line-height: 40px;
    z-index: 1000;
    background-image: url('../assets/imgs/bg_playticket_line.png');
    background-size: 100% 100%;
}

.cameras-p-div {
    z-index: 1000;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: url('../assets/imgs/bg_safe_direction.png');
    background-size: cover;
    position: relative;
    position: absolute;
    right: 35px;
    bottom: 70px;
    /* display: flex; */
}

.img-up {
    position: absolute;
    top: 3%;
    left: 50%;
    transform: translateX(-50%);
}

.img-left {
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translateY(-50%);
}

.img-right {
    position: absolute;
    top: 50%;
    right: 3%;
    transform: translateY(-50%);
}

.img-down {
    position: absolute;
    bottom: 3%;
    left: 50%;
    transform: translateX(-50%);
}

.contenteditablespan:focus {
    outline: none;
}

.icon-img {
    width: 15px;
}

.punish-img {
    width: 25px;
    cursor: pointer;
}

.share-img {
    width: 20px;
    cursor: pointer;
}

.security-video-l {
    left: 20px;
    top: 50px;
    right: 270px;
    bottom: 20px;

    .intel_item {
        background-size: 100% 100%;
        background-color: #d3e6ff;
        padding: 20px 20px 0 20px;
        border-radius: 16px;

        .video_name {
            padding: 15px 0;
            box-sizing: border-box;
            bottom: 0;
            left: 15px;
            right: 15px;
            background-color: #d3e6ff;
        }

        .videoZ {
            position: absolute;
            left: 10px;
            right: 10px;
            bottom: 60px;
            z-index: 3;
            top: 10px;
        }
    }

    .intel_item_choose {
        border: 2px solid #2180ff;
    }
}

.security-video-l_4 .intel_item_1 {
    top: 0;
    left: 0;
    right: 51%;
    bottom: 51%;
}

.security-video-l_4 .intel_item_2 {
    top: 0;
    left: 51%;
    right: 0;
    bottom: 51%;
}

.security-video-l_4 .intel_item_3 {
    top: 51%;
    left: 0;
    right: 51%;
    bottom: 0;
}

.security-video-l_4 .intel_item_4 {
    top: 51%;
    left: 51%;
    right: 0;
    bottom: 0;
}

.security-video-l_9 .intel_item_1 {
    top: 0;
    left: 0;
    right: 67%;
    bottom: 67%;
}

.security-video-l_9 .intel_item_2 {
    top: 0;
    left: 34%;
    right: 34%;
    bottom: 67%;
}

.security-video-l_9 .intel_item_3 {
    top: 0;
    left: 67%;
    right: 0;
    bottom: 67%;
}

.security-video-l_9 .intel_item_4 {
    top: 34%;
    left: 0;
    right: 67%;
    bottom: 34%;
}

.security-video-l_9 .intel_item_5 {
    top: 34%;
    left: 34%;
    right: 34%;
    bottom: 34%;
}

.security-video-l_9 .intel_item_6 {
    top: 34%;
    left: 67%;
    right: 0;
    bottom: 34%;
}

.security-video-l_9 .intel_item_7 {
    top: 67%;
    left: 0;
    right: 67%;
    bottom: 0;
}

.security-video-l_9 .intel_item_8 {
    top: 67%;
    left: 34%;
    right: 34%;
    bottom: 0;
}

.security-video-l_9 .intel_item_9 {
    top: 67%;
    left: 67%;
    right: 0;
    bottom: 0;
}

.security-video-l_16 .intel_item_1 {
    top: 0;
    left: 0;
    right: 75.5%;
    bottom: 75.5%;
}

.security-video-l_16 .intel_item_2 {
    top: 0;
    left: 25.5%;
    right: 50.5%;
    bottom: 75.5%;
}

.security-video-l_16 .intel_item_3 {
    top: 0;
    left: 50.5%;
    right: 25.5%;
    bottom: 75.5%;
}

.security-video-l_16 .intel_item_4 {
    top: 0;
    left: 75.5%;
    right: 0;
    bottom: 75.5%;
}

.security-video-l_16 .intel_item_5 {
    top: 25.5%;
    left: 0;
    right: 75.5%;
    bottom: 50.5%;
}

.security-video-l_16 .intel_item_6 {
    top: 25.5%;
    left: 25.5%;
    right: 50.5%;
    bottom: 50.5%;
}

.security-video-l_16 .intel_item_7 {
    top: 25.5%;
    left: 50.5%;
    right: 25.5%;
    bottom: 50.5%;
}

.security-video-l_16 .intel_item_8 {
    top: 25.5%;
    left: 75.5%;
    right: 0;
    bottom: 50.5%;
}

.security-video-l_16 .intel_item_9 {
    top: 50.5%;
    left: 0;
    right: 75.5%;
    bottom: 25.5%;
}

.security-video-l_16 .intel_item_10 {
    top: 50.5%;
    left: 25.5%;
    right: 50.5%;
    bottom: 25.5%;
}

.security-video-l_16 .intel_item_11 {
    top: 50.5%;
    left: 50.5%;
    right: 25.5%;
    bottom: 25.5%;
}

.security-video-l_16 .intel_item_12 {
    top: 50.5%;
    left: 75.5%;
    right: 0;
    bottom: 25.5%;
}

.security-video-l_16 .intel_item_13 {
    top: 75.5%;
    left: 0;
    right: 75.5%;
    bottom: 0;
}

.security-video-l_16 .intel_item_14 {
    top: 75.5%;
    left: 25.5%;
    right: 50.5%;
    bottom: 0;
}

.security-video-l_16 .intel_item_15 {
    top: 75.5%;
    left: 50.5%;
    right: 25.5%;
    bottom: 0;
}

.security-video-l_16 .intel_item_16 {
    top: 75.5%;
    left: 75.5%;
    right: 0;
    bottom: 0;
}

.security-video-l_4 .popBox,
.security-video-l_9 .popBox,
.security-video-l_16 .popBox {
    top: 0;
    left: 0;
    right: 15px;
    bottom: 0;
}

.security-video-r {
    top: 10px;
    padding: 50px 15px 15px 15px;
    width: 235px;
    right: 20px;
    bottom: 20px;
    box-shadow: 1px 1px 20px #d3e6ff;

    .security-video-r-box {
        position: absolute;
        top: 50px;
        left: 35px;
        right: 15px;
        bottom: 50px;
        overflow-y: auto;
    }
}
</style>
<script>
import EZUIKitVideo from './EZUIKitVideo/index'
export default {
    components: { EZUIKitVideo },
    data() {
        return {
            rid: '', //截屏的视频id
            textarea: '',
            state: 0, //分享罚单展示 1——点击截屏后展示
            cropperSrc: '', //截屏图片
            datas: {},
            isLayerForm: false,
            isFull: false, //当前是否是全屏
            isActive: 0, //当前选中的视频
            countNum: 4, //分的屏
            totalcount: 0,
            currentPage: 1,
            cameralistr: [], //用于显示右侧列表
            cameralistl: [], //左侧所有视频列表
            isFullArr: {
                cameralist4: [],
                cameralist9: [],
                cameralist16: []
            },
            cameralistjson: {
                cameralist4: [],
                cameralist9: [],
                cameralist16: []
            }, //左侧四个视频
            defaultProps: {
                children: 'list',
                label: 'name'
            },
            tableList: [],
            classShot: ['screenshot2', 'span-screenshot2'],
            listType: 1,
            lastedNew: {},
            multipleSelection: []
        }
    },
    mounted() {
        this.datas.startDate = ''
        this.datas.endDate = ''
        this.bus.$on('changeSection', data => {
            this.QuerySafeCameraList()
            this.getList()
        })
        // 获取摄像头列表
        this.QuerySafeCameraList()
        //查询未带安全帽消息列表
        this.QueryNotSafeHatMsgList()
    },
    // beforeDestroy() {
    // 	this.bus.$off('changeSection');
    // },
    methods: {
        // 选择表格行
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 点击批量删除
        addFun() {
            if (
                this.common.localget('userinf').mbrPhone != 'admin' &&
                this.common.localget('userinf').id != '149'
            ) {
                this.bus.$emit('tipFun', {
                    type: 1,
                    msg: '抱歉，您没有操作权限！'
                })
            } else {
                let idArr = [],
                    ridArr = [],
                    msgWaringPic = []
                this.multipleSelection.map(item => {
                    let name = item.rcontent.substring(item.rcontent.lastIndexOf('/') + 1)
                    idArr.push(item.id)
                    ridArr.push(item.rid), msgWaringPic.push(name)
                })
                if (idArr.length == 0) {
                    this.bus.$emit('tipFun', {
                        type: 1,
                        msg: '请选择删除项目！'
                    })
                } else {
                    console.log(msgWaringPic)
                    this.$refs.dialog.dialogSet(() => {
                        this.post(this, 'DelWarningMsg', {
                            msgWaringIds: idArr.join(','),
                            msgWaringRids: ridArr.join(','),
                            msgWaringPic: msgWaringPic.join(','),
                            msgWaringType: this.multipleSelection[0].type
                        }).then(res => {
                            this.currentPage =
                                this.tableList.length == 1 ? this.currentPage - 1 : this.currentPage
                            this.getList(this.currentPage) //重新获取列表数据
                        })
                    }, '确定要删除吗？')
                }
            }
        },
        // 选择时间
        changeTime(data) {
            this.datas = Object.assign({}, this.datas, data)
            this.getList()
        },
        QueryNotSafeHatMsgList() {
            this.post(this, 'QueryNotSafeHatMsgList', {
                page: 0,
                section: Number(this.common.localget('section'))
            }).then(res => {
                this.lastedNew = res.ext.result[0]
            })
        },
        //开始转动
        start(item, obj) {
            var _this = this
            _this.post(_this, 'EzopenToken', {}).then(res => {
                let data = `deviceSerial=${item.deviceSerial}&channelNo=${Number(
                    item.channelNo
                )}&direction=${obj.direction}&speed=${obj.speed}&accessToken=${res.ext.accessToken}`
                fetch('https://open.ys7.com/api/lapp/device/ptz/start', {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(function(d) {
                        return d.text()
                    })
                    .then(function(d) {
                        let res2 = JSON.parse(d)
                        if (res2.code == '200') {
                            var x = setTimeout(() => {
                                fetch('https://open.ys7.com/api/lapp/device/ptz/stop', {
                                    method: 'POST',
                                    body: `deviceSerial=${item.deviceSerial}&channelNo=${Number(
                                        item.channelNo
                                    )}&direction=${obj.direction}&accessToken=${
                                        res.ext.accessToken
                                    }`,
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }
                                }).then(function(d) {})
                            }, 1000)
                        } else {
                            _this.bus.$emit('tipFun', {
                                type: 1,
                                msg: res2.msg
                            })
                        }
                    })
                    .then(function(d) {})
            })
        },
        //截屏函数
        cropper() {
            var obj = $('#intel_item_choose'),
                off = obj.offset()
            x = off.left + 20
            y = window.screen.availHeight - document.body.clientHeight + off.top + 20
            w = obj.width() + 82 - 78
            h = obj.height() + 82 - 135
            StartCapture()
        },
        // 截图成功后模拟点击事件显示弹框
        showCorpper() {
            this.textarea = ''
            this.state = 1
            this.$refs.layer.layerSet('', '50%', '65%')
            this.cropperSrc = 'data:image/jpg;base64,' + localStorage.getItem('cropperSrc')
        },
        // 没有截图软件时，提示安装
        downloadUrl() {
            let that = this
            that.$refs.dialog.dialogSet(() => {
                location.href = localStorage.getItem('downloadUrl')
            }, '允许安装截屏插件？')
        },
        //获取截图列表
        getList(p) {
            this.currentPage = p || 1
            p = p ? p - 1 : 0 //page是从'0'开始的第一页
            this.datas.page = p
            this.datas.page_size = 10
            this.datas.section = Number(this.common.localget('section'))
            this.post(this, 'QueryNotSafeHatMsgList', this.datas).then(res => {
                this.totalcount = res.ext.total_count
                this.tableList = res.ext.result
            })
        },
        //确认保存
        submitForm() {
            if (!this.textarea) {
                this.bus.$emit('tipFun', {
                    type: 1,
                    msg: '请输入备注！'
                })
                return
            }
            // 文件上传
            var arr = this.cropperSrc.split(',')
            var mime = arr[0].match(/:(.*?);/)[1]
            var bstr = atob(arr[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            //转换成file对象
            let file = new File([u8arr], '截图.jpg', {
                type: mime
            })
            let that = this
            let fd = new FormData()
            fd.append('UploadMulitFile', file)
            that.post(
                that,
                'UploadMulitFile',
                fd,
                {
                    showLoading: true
                },
                true
            ).then(res => {
                if (res.state === 0) {
                    let fileArr = res.ext[0].fleNewName
                    that.submitSure({
                        rid: this.rid,
                        content: this.textarea,
                        rcontent: fileArr
                    })
                }
            })
        },
        submitSure(obj) {
            this.post(this, 'UpdateNotSafeHat', obj, {
                showLoading: true
            }).then(res => {
                let that = this
                that.bus.$emit('tipFun', {
                    type: 1,
                    msg: '',
                    fun: () => {
                        that.QueryNotSafeHatMsgList() //重新获取最新消息提示
                        that.$refs.layer.dialog = false
                        that.textarea = ''
                    }
                })
            })
        },
        //点击更多
        moreList() {
            this.listType = 2
            this.datas.startDate = ''
            this.datas.endDate = ''
            this.getList()
        },
        //返回
        backFun() {
            this.listType = 1
        },
        lookbidgQrCode(img) {
            this.bus.$emit('codeImg', img)
        },
        // 选择右侧视频
        handleNodeClick(item) {
            if (item.list) {
                return false
            }
            let listc = this.cameralistjson['cameralist' + this.countNum]
            listc[this.isActive] = item
            let ind = this.common.inArray(item, listc)
            this.$nextTick(function() {
                $('.intel_item_choose')
                    .find('.video-foot')
                    .next()
                    .remove()
                $('.intel_item_choose')
                    .find('.video_name span')
                    .text(item.name)
                let str =
                    '<video style="width:100%;height:100%;" id="myPlayer' +
                    this.isActive +
                    '" autoplay><source src="' +
                    item.rtmp +
                    '" type="" /></video>'
                $('.intel_item_choose').append(str)
                new EZUIPlayer('myPlayer' + this.isActive + '')
            })
            for (let i = 0; i < listc.length; i++) {
                if (listc[i].ischoose) {
                    listc[i].ischoose = !listc[i].ischoose
                } else {
                    this.$set(
                        this.cameralistjson['cameralist' + this.countNum][i],
                        'ischoose',
                        false
                    )
                }
            }
            if (listc[ind].ischoose) {
                listc[ind].ischoose = !listc[ind].ischoose
            } else {
                this.$set(this.cameralistjson['cameralist' + this.countNum][ind], 'ischoose', true)
            }
        },
        // 点击切换分屏
        changeFun(type) {
            //点击的分屏不等于当前分屏才执行以下操作
            let bool = this.countNum != type ? true : false
            this.countNum = type
            bool && this.QuerySafeCameraList()
            bool && this.recover()
        },
        QuerySafeCameraList() {
            this.post(
                this,
                'QuerySafeCameraList',
                {
                    section: Number(this.common.localget('section'))
                },
                {
                    showLoading: true
                }
            ).then(res => {
                let lists = res.ext.result
                this.cameralistr = lists
                this.cameralistjson = {
                    cameralist4: [],
                    cameralist9: [],
                    cameralist16: []
                } //左侧四个视频
                this.cameralistl = []
                for (let i = 0; i < lists.length; i++) {
                    for (let j = 0; j < lists[i].list.length; j++) {
                        for (let k = 0; k < lists[i].list[j].list.length; k++) {
                            this.cameralistl.push(lists[i].list[j].list[k])
                        }
                    }
                }
                this.arrrayFun()
            })
        },
        // 切换分屏后对视频重新排列
        arrrayFun() {
            let count = 1
            for (let i = 0; i < this.cameralistl.length; i++) {
                if (count <= this.countNum) {
                    this.cameralistjson['cameralist' + this.countNum].push(this.cameralistl[i])
                    count++
                } else {
                    break
                }
            }
            let listc = this.cameralistjson['cameralist' + this.countNum]
            for (let i = 0; i < listc.length; i++) {
                this.isFullArr['cameralist' + this.countNum].push(false)
            }
            this.$nextTick(function() {
                $('.security-video-l')
                    .find('.intel_item')
                    .find('.video-foot')
                    .next()
                    .remove()
                let str = ''
                for (let i = 0; i < this.cameralistjson['cameralist' + this.countNum].length; i++) {
                    str =
                        '<video style="width:100%;height:100%;" id="myPlayer' +
                        i +
                        '" autoplay><source src="' +
                        this.cameralistjson['cameralist' + this.countNum][i].rtmp +
                        '" type="" /></video>'
                    $('.security-video-l')
                        .find('.intel_item')
                        .eq(i)
                        .append(str)
                    new EZUIPlayer('myPlayer' + i + '')
                }
            })
        },
        // 点击分享
        shareFun() {},
        // 单机选中左侧视频
        choosevideo(ind) {
            //单机选中左侧视频
            this.isActive = ind
        },
        //双击放大视频
        bigvideoFun(item, ind) {
            this.rid = item.id
            this.isActive = ind
            this.isFull = true
            this.classShot = ['screenshot1', 'span-screenshot1']
            this.isFullArr['cameralist' + this.countNum][ind] = true
        },
        // 点击返回图标将视频还原
        recover() {
            this.isFull = false
            this.classShot = ['screenshot2', 'span-screenshot2']
            this.isFullArr = {
                cameralist4: [],
                cameralist9: [],
                cameralist16: []
            }
        },
        //判断是否安装了flash插件
        detectFlash() {
            if (navigator.mimeTypes.length > 0) {
                var flashAct = navigator.mimeTypes['application/x-shockwave-flash']
                return flashAct != null ? flashAct.enabledPlugin != null : false
            } else if (self.ActiveXObject) {
                try {
                    new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                    return true
                } catch (oError) {
                    return false
                }
            }
        },
        //判断是否启用了flash
        isforbid() {
            var flag = false
            if (window.ActiveXObject) {
                try {
                    var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
                    if (swf) {
                        flag = true
                    }
                } catch (e) {}
            } else {
                try {
                    var swf = navigator.plugins['Shockwave Flash']
                    if (swf) {
                        flag = true
                    }
                } catch (e) {}
            }
            return flag
        }
    }
}
</script>
