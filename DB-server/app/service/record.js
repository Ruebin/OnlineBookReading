'use strict';

const Service = require('egg').Service;

class RecordService extends Service {
    async recordRead(data) {

        //上报记录
        let res1 = await this.app.mysql.get('reading_record', {
            user_name: data.user_name,
            book_id: data.book_id
        })
        if (res1 === null) {
            //插入
            let res2 = await this.app.mysql.insert('reading_record', {
                user_name: data.user_name,
                book_id: data.book_id,
                last_reading_duration: data.time,
                total_reading_duration: data.time,
                current_page: data.current_page,
                reading_state: 'reading'
            })
            if (res2.affectedRows === 1) {
                return {
                    msg: '上报阅读记录成功'
                }
            }
            this.ctx.status = 400
            return {
                msg: '上报阅读记录失败'
            }
        }
        //更新
        let res3 = await this.app.mysql.update('reading_record', {
            last_reading_duration: data.time,
            total_reading_duration: parseInt(res1.total_reading_duration) + parseInt(data.time),
            current_page: data.current_page
        }, {
            where: {
                user_name: data.user_name,
                book_id: data.book_id
            }
        })

        if(res3.affectedRows === 1) {
            return {
                msg: '上报阅读记录成功'
            }
        }
        this.ctx.status = 400
        return {
            msg: '上报阅读记录失败'
        }
    }
}

module.exports = RecordService;
