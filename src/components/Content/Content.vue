<template>
    <el-header class="content">
        <div class="topAndNew">
            <div class="top" @click="scrollTop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fanhuidingbu-"></use>
                </svg>
            </div>
            <div @click="dialogTableVisible = true" class="new">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xinjian"></use>
                </svg>
            </div>
        </div>

        <el-dialog
                class="dialog"
                title="添加新的便签"
                :visible.sync="dialogTableVisible">
            <el-input
                    type="textarea"
                    row="6"
                    placeholder="请输入内容"
                    v-model="text">
            </el-input>
            <div class="block">
                <span class="demonstration">需要星级：</span>
                <el-rate v-model="value"></el-rate>
            </div>
            <button class="button" @click="createNote">添加</button>
        </el-dialog>

        <div class="note" v-for="item in array" :key="item._id" :ref="item._id">
            <div class="time">
                {{ item.createdAt | formatDate}}
                <div @click="deleteNote($event,item._id)">
                    <svg class="icon" aria-hidden="true" @click.prevent>
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
            <el-input
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 8}"
                    @blur="textChange(item)"
                    v-model="item.text">
            </el-input>
            <el-rate
                    :colors="['#15D1E8 ', '#15D1E8 ', '#15D1E8 ']"
                    disabled-void-color="#C0C4CC"
                    disabled
                    v-model="item.value"
            ></el-rate>
            <div class="button">
                <button v-if="!item.finish" @click="finishChange(item)">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-done"></use>
                    </svg>
                </button>
                <button v-else class="done">已完成</button>
            </div>
        </div>
    </el-header>
</template>

<script src="./content.js"></script>

<style scoped lang="scss" src="./content.scss"></style>