import sjcl from '../../../node_modules/stellar-wallet-js-sdk/lib/util/sjcl'
import fs from 'fs'
import uuidV4 from 'uuid'
import randomstring from 'randomstring'
import { base } from '@tokend/js-sdk'

var keyExtension = 'key'
var issuancesExtension = 'iss'
var txExtention = 'tx'
var fs_test = fs

function randNum (min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

export default {
  storeKey (privateKey, password) {
    var app = require('electron').remote
    var dialog = app.dialog
    dialog.showSaveDialog(function (fileName) {
      if (fileName === undefined) {
        alert('You didn\'t save the file')
        return
      }
      var data = sjcl.encrypt(password, privateKey)
      fs.writeFile(fileName + '.' + keyExtension, data, function (err) {
        if (err) {
          alert('An error occurred creating the file ' + err.message)
        }
      })
      alert('You can now use the file to login')
    })
  },
  loadKey (callback) {
    var app = require('electron').remote
    var dialog = app.dialog
    dialog.showOpenDialog({filters: [{name: 'Keys', extensions: [keyExtension]}]}, function (fileNames) {
      if (fileNames !== undefined) {
        readFile(fileNames[0], callback)
      }
    })
    function readFile (filepath, callback) {
      fs.readFile(filepath, 'utf-8', function (err, data) {
        if (err) {
          alert('An error ocurred reading the file :' + err.message)
        }
        let filename = filepath.match(/(?:\/|\\)?([^/\\]*)$/)[1]
        callback(filename, data)
      })
    }
  },
  openIssuances (callback) {
    var app = require('electron').remote
    var dialog = app.dialog
    dialog.showOpenDialog({filters: [{name: 'Keys', extensions: [issuancesExtension]}]},
      function (fileNames) {
        if (fileNames) {
          readFile(fileNames[0], function (result) {
            callback(result, fileNames[0])
          })
        }
      }
    )
    function readFile (filepath, callback) {
      fs.readFile(filepath, 'utf-8', function (err, data) {
        if (err) {
          alert('An error ocurred reading the file :' + err.message)
          callback([])
        }
        callback(JSON.parse(data).issuances)
      })
    }
  },
  updateIssuances (issuances, fileName) {
    var data = {
      issuances: []
    }
    for (var i = 0; i < issuances.length; i++) {
      var preEmission = base.PreIssuanceRequest.xdrFromData(issuances[i])
      data.issuances.push({
        preEmission: preEmission.toXDR('hex'),
        used: issuances[i].used
      })
    }
    fs.writeFile(fileName, JSON.stringify(data), function (err) {
      if (err) {
        alert('An error occurred creating the file ' + err.message)
      }
    })
  },
  createIssuances (quantity, amount, asset, keyPair) {
    var app = require('electron').remote
    var dialog = app.dialog
    dialog.showSaveDialog(function (fileName) {
      if (fileName === undefined) {
        alert('You didn\'t save the file')
        return
      }
      var data = {
        issuances: []
      }
      for (var i = 0; i < quantity; i++) {
        var opts = {
          reference: randomstring.generate(randNum(4, 64)),
          amount: amount.toString(),
          asset,
          keyPair: keyPair,
          creatorDetails: {}
        }
        var preEmission = base.PreIssuanceRequest.build(opts)
        data.issuances.push({
          preEmission: preEmission.toXDR('hex'),
          used: false
        })
      }
      fs.writeFile(fileName + '.' + issuancesExtension, JSON.stringify(data), function (err) {
        if (err) {
          alert('An error occurred creating the file ' + err.message)
        }
      })
      alert('The file has been successfully saved')
    })
  },
  createChangeIssuerOp (opts) {
    var app = require('electron').remote
    var dialog = app.dialog
    dialog.showSaveDialog(function (fileName) {
      if (fileName === undefined) {
        alert('You didn\'t save the file')
        return
      }

      const operation = base
          .ManageAssetBuilder
          .changeAssetPreIssuer({
            accountID: opts.accountId,
            code: opts.asset,
            source: opts.source,
            keyPair: opts.keypair
          })

      base.Network.use(new base.Network(opts.passphrase))
      const transaction = new base.TransactionBuilder(opts.source)
        .addOperation(operation)
        .build()

      transaction.sign(opts.keypair)

      const data = {
        asset: opts.asset,
        source: opts.source,
        accountId: opts.accountId,
        transaction: transaction.toEnvelope().toXDR().toString("base64")
      }

      fs.writeFile(fileName + '.' + txExtention, JSON.stringify(data), function (err) {
        if (err) {
          alert('An error occurred creating the file ' + err.message)
        }
      })
      alert('The file has been successfully saved')
    })
  }
}
