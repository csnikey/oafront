<template>
    <div class='c-common-wrap'>
        <!--查询部分-->
        <div class="block">
            <router-link :to='"dailyleave"'><el-button type="primary">返回</el-button></router-link>
        </div>

        <div class="block m-addplan">


            <el-form ref="form" label-width="120px"  :inline="true">
                <el-form-item label="填写人:"  >
                    {{form.realname}}
                </el-form-item>
                <el-form-item label="申请时间:"  >
                    {{form.create_time}}
                </el-form-item>
            </el-form>
            <el-form ref="form" label-width="120px" >
                <el-form-item label="*请假类型">
                    <el-select v-model="form.attendance_id" placeholder="请假类型" disabled>
                        <el-option v-for="item in leave_type_list"
                                   :key="item.id"
                                   :label="item.attendance_name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="*紧急程度">
                    <el-select v-model="form.emer_status" placeholder="紧急程度" disabled>
                        <el-option label="一般" value="1"></el-option>
                        <el-option label="紧急" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <div class="el-formli-self">
                    <label class="el-label">*请假时间</label>

                    <el-date-picker
                            v-model="form.start_time"
                            type="datetime"
                            placeholder="开始日期"
                            :picker-options="pickerOptions0" disabled>
                    </el-date-picker >


                    <el-date-picker
                            v-model="form.end_time"
                            type="datetime"
                            placeholder="结束日期"
                            :picker-options="pickerOptions0" disabled>
                    </el-date-picker>

                </div>

                <div class="el-formli-self">
                    <label class="el-label">*请假天数</label>
                    <el-input-number v-model="form.leave_days" :step="0.5" :min='min' disabled></el-input-number>&nbsp;&nbsp;(0.5天为单位)

                </div>
                <div class="el-formli-self">
                    <label class="el-label">*申请描述</label>


                    <el-input type="textarea" v-model="form.content" disabled></el-input>

                </div>
            </el-form>

        </div>

        <div class="block m-addplan">
            <div style="padding-left:55px">当前状态：{{cur_status}}</div>

            <div class="common-wrap">

                <el-steps :space="150" :active="cur_steps.length - 1" finish-status="success">
                    <el-step  v-for="item in cur_steps"
                             :key="item.id"
                             :title="(item.step == 1 ? item.realname : '') + item.step_desc" ></el-step>


                    <el-step  v-for="item in left_steps"
                              :key="item.id"
                              :title="item.step_desc" ></el-step>
                </el-steps>
                <el-table
                        :data="cur_steps"
                        border
                        style="width: 100%;margin-top:20px">
                    <el-table-column
                            prop="staff_name"
                            label="节点"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="step_desc"
                            label="状态"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="备注">
                    </el-table-column>
                    <el-table-column
                            prop="update_time"
                            label="时间">
                    </el-table-column>
                </el-table>
            </div>


        </div>

    </div>
</template>
<script>
    // import tableData3 from '@/data/dayplanlist'
    import { VueEditor } from 'vue2-editor'
    import common from '@/util/common'
    export default {
        name:'InfoDailyLeave',
        created(){
            if(typeof this.$route.params.id != undefined)
                this.form.id   = this.$route.params.id;
        },
        mounted() {
            this.$api.getUserinfo().then(res => {
                var resData = res.data;
                if(resData.error == 0){
                    this.form.realname = resData.data.realname;
                }
            });
            this.getLeaveType();
            if(this.form.id) {
                this.getLeaveInfo({id:this.form.id});
            }
        },
        data() {
            return {
                days:'0',
                min:0,
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                content:'',
                form: {
                    realname: '',
                    create_time:common.getNowDate(),
                    emer_status: '1',
                    start_time: '',
                    end_time:'',
                    leave_days:'',
                    content:'',
                    attendance_id: '',
                    id:''
                },
                leave_type_list:[],
                cur_steps:[],
                left_steps:[],
                cur_status:''

            }
        },
        components:{
            VueEditor
        },
        methods: {
            // 保存信息
            save(){
                this.$api.post('/daily/leave/save', this.form).then(res => {
                    if(res.error == 0) {
                        this.$message({
                            message: '保存成功，3s后返回请假列表',
                            type: 'success'
                        });
                        setTimeout(() =>{
                            this.$router.push({ name: `dailyleave` })
                        }, 3000);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            getLeaveType(){
                this.$api.get('/daily/leave/gettype').then(res => {
                    if(res.error == 0) {
                        this.leave_type_list = res.data;
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            },
            getLeaveInfo(params) {
                this.$api.get('/daily/leave/get', params).then(res => {
                    if(res.error == 0) {
                        var info = res.data.info;
                        this.cur_steps = res.data.cur_steps;
                        this.cur_status = info.cur_approve_desc;
                        this.cur_steps.map(obj => {
                            if(obj.realname) obj.staff_name = obj.staff_id + '/' + obj.realname;
                            else obj.staff_name = '';
                            return obj;
                        });
                        this.left_steps = res.data.left_steps;
                        for(var key in this.form) {
                            if(key == 'realname') continue;
                            this.form[key] = info[key];
                        }

                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'warning'
                        });
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-formli-self{
        margin-bottom: 22px;
        padding-left:120px;
        .el-label{
            text-align: right;
            margin-left:-120px;
            vertical-align: middle;
            float: left;
            font-size: 14px;
            color: #48576a;
            line-height: 1;
            padding: 11px 12px 11px 0;
            box-sizing: border-box;
            width:120px;
        }
    }
    .c-common-wrap{
        padding:10px;
    }
    .m-addplan{
        margin-top: 20px;
        border:1px solid #dcdcdc;
        padding:20px 10px;

    }


    .common-wrap{
        padding-left:60px;
        padding-top:20px;
    }


</style>
