const Tree = require('./tree')

const sum = (a, b) => a + b
const sub = (a, b) => a - b
const concat = (s1, s2) => `${s1}${s2}`

test('tree shallow test', () => {
    const tree = new Tree

    tree.add('sum', sum)

    expect(tree.find('sum')(2, 5)).toBe(7)

    tree.remove('sum')

    expect(tree.find('sum')).toBe(undefined)
});

test('tree deep test', () => {
    const tree = new Tree

    tree.add('math.int32.sum', sum)
    tree.add('math.sub', sub)
    tree.add('string.concat', concat)

    expect(tree.find('math.int32.sum')(1, 3)).toBe(4)
    expect(tree.find('math.sub')(1, 3)).toBe(-2)
    expect(tree.find('string.concat')('json-', 'rpc')).toBe('json-rpc')

    /* found and deleted */
    expect(tree.remove('math')).toBe(true)
    /* not found */
    expect(tree.remove('math')).toBe(false)
    tree.remove('string.concat')

    expect(tree.find('math.int32.sum')).toBe(undefined)
    expect(tree.find('math.sub')).toBe(undefined)
    expect(tree.find('string.concat')).toBe(undefined)
});
