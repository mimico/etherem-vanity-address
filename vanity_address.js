/* Vanity Ethereum Address
 * file: vanity_address.js
 *
 *  This program finds a private key with a corresponding Ethereum address that starts with "0x<hex_string_of_your_choice>".
 *  Uses privateToPublic and keccak256 to demonstrate the address generation process, hashing and the use of buffers
 */


/*
 * secp256k public keys are 64 bytes

 * Ethereum addresses are 20 bytes
 *
 * To compute an ethereum address from a public key:
 *        Hash public key with keccak256 (giving 32 bytes)
 *        Take last 20 bytes of hash
 *        Encode as hexadecimal
 *        Prefix with "0x"
 *        Optional: Compute checksum
 *
 */

/* To run: node vanity_address.js */

const crypto = require('crypto')
const eth = require('ethereumjs-util')

let ethereum_address = "";

do {

  // get 32 bytes to be the private key
  var private_key = crypto.randomBytes(32);
  // console.log (private_key);

  // make public key
  let public_key = eth.privateToPublic(private_key);
  // console.log (public_key);

  // hash public key with keccak256
  let hash_of_public_key = eth.keccak256(public_key);
  // console.log (hash_of_public_key);

  // encode hash as hexadecimal
  let hex_encode = hash_of_public_key.toString('hex');
  // console.log (hex_encode);

  //process.stdout.write ('.');

  // take last 20 bytes of hash: 1 byte = 2 hex chars
  ethereum_address = hex_encode.slice (24);
  //console.log (ethereum_address);

} while (!ethereum_address.startsWith('abba')); /* <--- replace abba
  * with your vanity hexword or hexnumbers (lowercase), unless you are
  * a fan of abba, then proceed */

console.log ("\n");
console.log ("private key:      " + private_key.toString('hex'));

// Prefix with "0x"
ethereum_address = "0x" + ethereum_address
console.log ("ethereum address: " + ethereum_address);

// compute checksum
let checksum = eth.toChecksumAddress (ethereum_address);
console.log ("checksum:         " +checksum);

//check validity
let truth = eth.isValidChecksumAddress (checksum);
console.log ("valid checksum:   " + truth);
console.log ("\n");

