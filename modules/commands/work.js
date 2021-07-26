module.exports.config = {
	name: "work",
	version: "0.0.1",
	hasPermssion: 0,
	credits: "CatalizCS",
	description: "Có làm thì mới có ăn!",
	commandCategory: "Economy",
	usages: "work",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 60000
    }
};

module.exports.run = async ({ event, api, Currencies, global }) => {
    const { threadID, messageID } = event;
    const cooldown = global.work.cooldownTime;
    const data = (await Currencies.getData(event.senderID)).workTime;
    if (typeof data !== "undefined" && cooldown - (Date.now() - data) > 0) {
        var time = cooldown - (Date.now() - data),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0);
        
		return api.sendMessage(`Bạn đang trong thời gian chờ\nVui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`, event.threadID, event.messageID);
    }
    else {
        const job = [
            "đi bán vé số",
            "đi sửa xe",
            "làm nhân viên lập trình",
            "đi hack facebook",
            "làm thợ sửa ống nước ( ͡° ͜ʖ ͡°)",
            "làm đầu bếp",
            "làm thợ hồ",
            "làm Racing boy",
            "trộm thời gian",
            "làm Thanos khoai lang tím trong Marvel",
            "phát khẩu trang dạo",
            "làm từ thiện 14 tỷ",
            "solo thắng Faker",
            "làm người nổi tiếng trong 3 giây",
            "đã đào bitcoins",
            "thử thách làm chó trong 24h",
            "đã hoàn thành nhiệm vụ làm người",
            "thi rớt tốt nghiệp",
            "làm sờ chym mơ",
            "đi bán hàng online",
            "làm nội trợ cho tổng thống",
            "đã chơi Yasuo trong rank và gánh team"
        ];
        const amount = Math.floor(Math.random() * 1500);
        return api.sendMessage(`Bạn ${job[Math.floor(Math.random() * job.length)]} và đã nhận được số tiền là: ${amount} đô`, threadID, async () => {
             await Currencies.increaseMoney(event.senderID, parseInt(amount));
             await Currencies.setData(event.senderID, { workTime: Date.now() });
        }, messageID);
    }
       
}
