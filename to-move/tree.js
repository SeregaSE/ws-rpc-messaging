const DELIMITER = '.'

class Tree {
    constructor(root) {
        this.root = root || {}
    }

    _parse(path) {
        return path.trim().split(DELIMITER)
    }

    add(path, item) {
        const leafs = this._parse(path)

        let location = this.root

        for (let i = 0; i < leafs.length; i += 1) {
            const leaf = leafs[i]

            if (location[leaf] === undefined) {
                location[leaf] = {}
            }

            if (leafs.length - 1 === i) {
                location[leaf] = item
            }

            location = location[leaf]
        }
    }

    remove(path) {
        const leafs = this._parse(path)

        let location = this.root

        for (let i = 0; i < leafs.length; i += 1) {
            const leaf = leafs[i]

            if (location[leaf] === undefined) {
                return false
            }

            if (leafs.length - 1 === i) {
                delete location[leaf]
                return true
            }

            location = location[leaf]
        }
    }

    find(path) {
        const leafs = this._parse(path)

        let location = this.root

        for (let i = 0; i < leafs.length; i += 1) {
            const leaf = leafs[i]

            if (location[leaf] === undefined) {
                return
            }

            location = location[leaf]
        }

        return location
    }
}

module.exports = Tree