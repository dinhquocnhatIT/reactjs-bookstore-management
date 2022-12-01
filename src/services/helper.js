//file giup phat trien them 
class Helper{
    static formatCurrency(number){
        return Number(number).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    }
}

export default Helper;