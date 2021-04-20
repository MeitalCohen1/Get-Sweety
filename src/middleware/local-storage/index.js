export default {

    insert: function (table, item) { //התפקיד של הפונקציה הוא להכניס את המידע לדאטה בייס
        var arr = this.select(table);
        item.id = new Date().getTime();
        arr.push(item)
        localStorage.setItem(table, JSON.stringify(arr));
    },

    remove: function (table, id) {

        var arr = this.select(table)
        var foundIndex = this._searchIndexById(table, id);
        if (!(foundIndex > -1)) {
            return;
        }

        // remove the item from arr
        arr.splice(foundIndex, 1)
        //Array.splice(position,num);
        localStorage.setItem(table, JSON.stringify(arr));
    },

    select: function (table) { // התפקיד של הפונקציה הוא לבחור מידע מתוך הדאטה בייס
        var result = localStorage.getItem(table);
        if (result == null) {
            result = '[]';
        }
        return JSON.parse(result);
    },

    update: function (table, id, item) {
        // select the relevant item from arr
        var arr = this.select(table)
        var foundIndex = this._searchIndexById(table, id)
        if (!(foundIndex > -1)) {
            return;
        }

        for (var key in item) {
            if (item[key]) {
                var selectedItem = arr [foundIndex];
                selectedItem[key] = item[key];
            }else {
                if (item.milky === false) {
                    var selectedItem = arr [foundIndex];
                    selectedItem[key] = item[key];
                }
            }
        }
        // update the arr to localStorage
        localStorage.setItem(table, JSON.stringify(arr));
    },

    getItemById: function (table, id) {
        var arr = this.select(table)
       return arr.find(function (item) { // פונקציה שעוזרת לנו לחפש בתוך מערך
            return item.id==id
       })
    },

    _searchIndexById: function (table, id) {
        var arr = this.select(table)
        var foundIndex = undefined;
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.id == id) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }
}


