<template>
    <div class="start-wrap" :class="startType">
        <span class="start-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
    </div>
</template>

<script>
    const LENGTH = 5 // 星星个数
    const CLS_ON = 'on' // 全星样式
    const CLS_HALF = 'half' // 半星样式
    const CLS_OFF = 'off' // 零星样式

    export default {
        name: "start",
        props: {
            size: {
                type: Number // 48
            },
            score: {
                type: Number // 3
            }
        },
        computed: {
            startType () {
                return 'start-' + this.size // 'start-48'
            },
            itemClasses () {
                let result = [] // 保存遍历后的class样式 []
                let score = Math.floor(this.score * 2) / 2 // 获取计算后的分数值 3
                let hasDecimal = score % 1 !== 0 // 判断是否有小数(是否有半星) boolean false
                let integer = Math.floor(score) // 有多少整数(有多少全星) 3个全星

                // 1.全星push到最终结果数组中 result = ['on','on','on']
                for (let i=0; i<integer; i++) {
                    result.push(CLS_ON)
                }

                //2. 判断是否有半星 半星最多有一个，不会出现多个 result = ['on','on','on']
                if (hasDecimal) {
                    result.push(CLS_HALF)
                }

                //3. 补齐最后的灰色星星 result = ['on','on','on','off','off']
                while (result.length < LENGTH) {
                    result.push(CLS_OFF)
                }

                // 最后返回数组 result = ['on','on','on','off','off']
                return result
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .start-wrap
        font-size 0
        .start-item
            display inline-block
        &.start-48
            .start-item
                width:20px
                height 20px
                margin-right 22px
                &:last-child
                    margin-right 0
                &.on
                    background url("star48_on@2x.png")
                    background-size 20px 20px
                    background-repeat no-repeat
                &.half
                    background url("star48_half@2x.png")
                    background-size 20px 20px
                    background-repeat no-repeat
                &.off
                    background url("star48_off@2x.png")
                    background-size 20px 20px
                    background-repeat no-repeat

        &.start-36
            .start-item
                width:15px
                height 15px
                margin-right 6px
                &:last-child
                    margin-right 0
                &.on
                    background url("star36_on@2x.png")
                    background-size 15px 15px
                    background-repeat no-repeat
                &.half
                    background url("star36_half@2x.png")
                    background-size 15px 15px
                    background-repeat no-repeat
                &.off
                    background url("star36_off@2x.png")
                    background-size 15px 15px
                    background-repeat no-repeat

        &.start-24
            .start-item
                width:10px
                height 10px
                margin-right 3px
                background-size 10px 10px
                background-repeat no-repeat
                &:last-child
                    margin-right 0
                &.on
                    background url("star24_on@2x.png")
                    background-size 10px 10px
                    background-repeat no-repeat
                &.half
                    background url("star24_half@2x.png")
                    background-size 10px 10px
                    background-repeat no-repeat
                &.off
                    background url("star24_off@2x.png")
                    background-size 10px 10px
                    background-repeat no-repeat
</style>