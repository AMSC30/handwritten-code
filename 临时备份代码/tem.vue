<template>
    <div class="security-video heiall pd20 clear txl posr" style="padding-top: 10px">
        <n-dialog ref="dialog"></n-dialog>
        <template v-if="listType == 1">
            <div
                class="posa pd20 video-wrapper"
                :style="{
                    zIndex: listType == 1 ? '100' : '10',
                    paddingTop: '10px',
                    backgroundColor: 'transparent'
                }"
            >
                <!-- 警示 -->
                <div class="f14 white warning posr" style="z-index: 999999">
                    <div :class="{ 'full-screen-wrapper': seeFullVideo }">
                        <n-back
                            :isHide="true"
                            @backFun="recover"
                            class="vtm cusp mgr10 punish-img"
                            v-show="isFull"
                        ></n-back>
                    </div>
                </div>
                <!-- 监控列表展示 -->
                <div :class="['lt', 'security-video-l', 'posa', 'security-video-l_' + countNum]">
                    <!-- 无视频 -->
                    <div
                        class="txc"
                        style="margin-top: 20%"
                        v-if="cameralistjson['cameralist' + countNum].length == 0"
                    >
                        <img class="nodata-img" src="../assets/imgs/default_data.png" />
                        <p class="heise">暂无数据</p>
                    </div>
                    <!-- 监控视频列表 -->
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
                        <!-- 控制按钮 -->
                        <div class="control-wraper" v-if="seeFullVideo">
                            <div class="center"></div>
                            <img
                                :src="controlActive == ind ? ite.inActive : ite.outActive"
                                class="direct"
                                :class="[directImgs[ind]]"
                                v-for="(ite, ind) of controlImgs"
                                @mousedown="start(item, { direction: ind, speed: 0 })"
                                @mouseup="controlActive = -1"
                                :key="ind + ite"
                            />
                        </div>
                        <!-- 视频选择框 -->
                        <p
                            class="posa video_name clear f14 posr"
                            @click.prevent="choosevideo(index)"
                        >
                            <span class="lt">{{ item.name }}</span>
                            <img
                                src="../../static/img/btn_model_all.png"
                                class="posa cusp"
                                style="right: 10px; top: 7px; width: 35px; height: 35px"
                                v-show="!isFull"
                                @click.prevent="bigvideoFun(item, index)"
                            />
                        </p>
                    </div>
                </div>
                <!-- 监控头选择 -->
                <div class="rt security-video-r posa posr">
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
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {
            rid: '', //截屏的视频id
            textarea: '',
            state: 0, //分享罚单展示 1——点击截屏后展示
            cropperSrc: '', //截屏图片
            datas: {},
            isFull: false, //当前是否是全屏
            isActive: 0, //当前选中的视频
            countNum: 4, //分的屏
            totalcount: 0,
            currentPage: 1,
            cameralistr: [], //用于显示右侧列表
            cameralistl: [], //左侧所有视频列表
            isFullArr: { cameralist4: [], cameralist9: [], cameralist16: [] },
            cameralistjson: { cameralist4: [], cameralist9: [], cameralist16: [] }, //左侧四个视频
            defaultProps: {
                children: 'list',
                label: 'name'
            },
            tableList: [],
            classShot: ['screenshot2', 'span-screenshot2'],
            listType: 1,
            lastedNew: {},
            seeFullVideo: false,
            controlImgs: [
                {
                    //上
                    outActive: require('../assets/images/video_10.png'),
                    inActive: require('../assets/images/video_11.png')
                },
                {
                    //下
                    outActive: require('../assets/images/video_14.png'),
                    inActive: require('../assets/images/video_15.png')
                },
                {
                    //做
                    outActive: require('../assets/images/video_08.png'),
                    inActive: require('../assets/images/video_09.png')
                },
                {
                    //右
                    outActive: require('../assets/images/video_12.png'),
                    inActive: require('../assets/images/video_13.png')
                }
            ],
            directImgs: ['top-img', 'bottom-img', 'left-img', 'right-img'],
            controlActive: -1
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
    beforeDestroy() {
        this.bus.$off('changeSection')
    },
    methods: {
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
        start(item, obj) {
            this.controlActive = obj.ind
            var _this = this
            _this.post(_this, 'EzopenToken', {}).then(res => {
                let data = `deviceSerial=${item.deviceSerial}&channelNo=${Number(
                    item.channelNo
                )}&direction=${obj.direction}&speed=${obj.speed}&accessToken=${res.ext.accessToken}`
                fetch('https://open.ys7.com/api/lapp/device/ptz/start', {
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                    .then(function (d) {
                        return d.text()
                    })
                    .then(function (d) {
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
                                }).then(function (d) {})
                            }, 1000)
                        } else {
                            _this.bus.$emit('tipFun', { type: 1, msg: res2.msg })
                        }
                    })
                    .then(function (d) {})
            })
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
                this.bus.$emit('tipFun', { type: 1, msg: '请输入备注！' })
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
            let file = new File([u8arr], '截图.jpg', { type: mime })
            let that = this
            let fd = new FormData()
            fd.append('UploadMulitFile', file)
            that.post(that, 'UploadMulitFile', fd, { showLoading: true }, true).then(res => {
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
            this.post(this, 'UpdateNotSafeHat', obj, { showLoading: true }).then(res => {
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
            this.$nextTick(function () {
                $('.intel_item_choose').find('.video_name').next().remove()
                $('.intel_item_choose').find('.video_name span').text(item.name)
                let str =
                    '<video style="width:100%;height:100%;" controls id="myPlayer' +
                    this.isActive +
                    '" poster="' +
                    (item.camerImage
                        ? item.camerImage
                        : 'https://hkrct.cninct.com/hkrc_dir/default/cam_default_15_1.png') +
                    '"><source src="' +
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
            this.post(this, 'QuerySafeCameraList', {}, { showLoading: true }).then(res => {
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
                        this.cameralistl.push(lists[i].list[j])
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
            this.$nextTick(function () {
                $('.security-video-l').find('.intel_item').find('.video-foot').next().remove()
                let str = ''
                for (let i = 0; i < this.cameralistjson['cameralist' + this.countNum].length; i++) {
                    str =
                        '<video style="width:100%;height:100%;" id="myPlayer' +
                        i +
                        '" poster="' +
                        (this.cameralistjson['cameralist' + this.countNum][i].camerImage
                            ? this.cameralistjson['cameralist' + this.countNum][i].camerImage
                            : 'https://pm.cninct.com/KXYY/cam_default_15_1.png') +
                        '"><source src="' +
                        this.cameralistjson['cameralist' + this.countNum][i].rtmp +
                        '" type="" /></video>'
                    $('.security-video-l').find('.intel_item').eq(i).append(str)
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
            this.seeFullVideo = true
        },
        // 点击返回图标将视频还原
        recover() {
            this.isFull = false
            this.classShot = ['screenshot2', 'span-screenshot2']
            this.isFullArr = { cameralist4: [], cameralist9: [], cameralist16: [] }
            this.seeFullVideo = false
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
<style scoped lang="scss">
.screenList {
    background: url('../assets/images/bg_10.png') no-repeat;
    background-size: 100% 105%;
    top: 20px;
}
.control-wraper {
    position: absolute;
    bottom: 75px;
    right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #6678ab7d;
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #447bab9e;
        transform: translate(-50%, -50%);
    }
    img {
        position: absolute;
        cursor: pointer;
    }
    .top-img {
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
    }
    .left-img {
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
    }
    .right-img {
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
    }
    .bottom-img {
        left: 50%;
        transform: translateX(-50%);
        bottom: 10px;
    }
}
.video-wrapper {
    top: 20px;
    bottom: 0;
    left: 0;
    right: 20%;
    background: url('../assets/images/bg_10.png') no-repeat;
    background-size: 100% 105%;
}
.label-More {
    display: inline-block;
    width: 100px;
    height: 30px;
    margin-left: 20px;
    line-height: 30px;
    text-align: center;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    background: linear-gradient(to right, #11f4c6, #0dcfff);
}
.warning {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .full-screen-wrapper {
        .video-foot {
            display: inline-block;
            border: 1px dashed white;
            border-radius: 5px;
            padding: 3px 20px 3px 20px;
        }
    }
}
.span-screenshot1 {
    // position: absolute;
    right: 26px;
    bottom: 15px;
    color: white;
}
.span-screenshot2 {
    right: 20px;
    bottom: 6px;
    color: #75aaff;
    display: none;
}
.screenshot1 {
    // position: absolute;
    right: 60px;
    bottom: 15px;
    z-index: 10;
    cursor: pointer;
}
.screenshot2 {
    // position: absolute;
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
    top: 20px;
    right: 20px;
    bottom: 20px;
    .intel_item {
        background-size: 100% 100%;
        background-color: transparent;
        padding: 10px;
        background: url('../assets/images/video_07.png') no-repeat;
        background-size: 100% 100%;
        .video_name {
            padding: 15px 0 15px 10px;
            box-sizing: border-box;
            bottom: 10px;
            left: 10px;
            right: 10px;
            background-color: black;
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
    top: 40px;
    left: 0;
    right: 15px;
    bottom: 0;
}
.security-video-r {
    top: 0;
    width: 20%;
    right: 20px;
    bottom: 0;
    transform: translateX(110%);
    background: url('../assets/images/bg_33.png') no-repeat;
    background-size: 100% 102%;
    .security-video-r-box /deep/ {
        position: absolute;
        top: 30px;
        left: 15px;
        right: 15px;
        bottom: 50px;
        overflow-y: auto;
        .security-tree.el-tree--highlight-current
            .el-tree-node.is-current
            > .el-tree-node__content {
            color: white;
        }
        .el-tree-node__content:hover {
            background: linear-gradient(to right, #11f4c6, rgba(25, 169, 255, 0));
            color: white;
        }
        .el-tree {
            background: transparent;
            color: #0dcfff;
        }
    }
}
</style>
