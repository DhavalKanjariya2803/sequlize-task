const Contacts = require('../models').contacts;



module.exports = {
    async list(req, res) {
      let rawData = req.body.rawData
      let filterContactList = []
      for (let i = 0; i < rawData.length; i++) {
        let singleContact = rawData[i]
        let flagAdd = true;
        if (filterContactList.indexOf(singleContact) !== -1) {
          flagAdd = false
          // continue;
        }
        for (let j = 0; j < filterContactList.length; j++) {
          let filterdSingleContact = filterContactList[j]
          let singleConatcCheck = singleContact.substr(singleContact.length - 10)
          let filterdContactCheck = filterdSingleContact.substr(filterdSingleContact.length - 10)
          console.log(filterdContactCheck, singleConatcCheck, 'data')
          if (singleConatcCheck == filterdContactCheck) {
            flagAdd = false
            // continue;
          }
        }
        if(flagAdd){
          filterContactList.push(singleContact)
        }
      }
      console.log(filterContactList, "singletime")
      addContactList = []
      for (let k= 0; k < filterContactList.length; k++) {
        let singleValue = {
          "contact" : filterContactList[k]
        } 
        addContactList.push(singleValue)
      }
      console.log(addContactList)
      await Contacts.bulkCreate(addContactList)
      return Contacts
        .findAll()
        .then((contactList) => res.status(200).send(contactList))
        .catch((error) => { res.status(400).send(error); });
    }
  };
