
# Immutable Reference Example

This project illustrates the concept of an Immutable Reference. Files can be stored on a decentralized storage (IPFS) and the resulting hash stored on the IOTA tangle. To avoid any fraud, the hash of a given document can be compared with one on the blockchain to determine if it's genuine or not.

## Getting Started

Ensure you have nodejs installed on your machine.

## Installation

Enter the main directory and run

```bash
npm install
```
To install all the dependencies

## Run

The project needs to be built before running it. To do this run:

```bash
npm nun build
```

Once the build process is complete, a separate folder called `dist` is created. To run the project, you can run:

```bash
npm run start
```

## Usage

Try and change the contents of the `sample/sample.txt` file and run `npm run start`. From the console logs, try and get the file content from IPFS and also the hash from IOTA Tangle. As you run

## Contributing

To contribute code to this repository please read the [CONTRIBUTING](./CONTRIBUTING.md) guidelines.

## License

[MIT](./LICENSE)

## References
[IPFS 101 example](https://github.com/ipfs-examples/js-ipfs-examples/tree/master/examples/ipfs-101)
[Masked Authentication Messaging Example](https://github.com/iotaledger/mam.js)
