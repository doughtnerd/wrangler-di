import { Injector } from './Injector'

class A {}
class B {}
class C {}

describe('Injector', () => {
  it('Can resolve dependencies from parent injector one level above', () => {
    const mainInjector = new Injector([{ provide: 'A', useClass: A }])
    const childInjector = new Injector([{ provide: 'B', useClass: B, deps: ['A'] }], mainInjector)

    expect(childInjector.inject('B')).toBeInstanceOf(B)
  })

  it('Can resolve dependencies from parent injector across all parents', () => {
    const mainInjector = new Injector([{ provide: 'A', useClass: A }])
    const child2 = new Injector([{ provide: 'B', useClass: B }], mainInjector)
    const child3 = new Injector([{ provide: 'C', useClass: C, deps: ['A', 'B'] }], child2)

    expect(child3.inject('C')).toBeInstanceOf(C)
  })

  it('Can resolve dependencies between services in a single injector', () => {
    const mainInjector = new Injector([
      { provide: 'A', useClass: A },
      { provide: 'B', useClass: B, deps: ['A'] }
    ])

    expect(mainInjector.inject('B')).toBeInstanceOf(B)
  })

  it('Returns the nearest matched provider in the Injector hierarchy', () => {
    const mainInjector = new Injector([{ provide: 'A', useClass: A }])
    const child1 = new Injector([{ provide: 'A', useClass: B }], mainInjector)

    expect(child1.inject('A')).toBeInstanceOf(B)
  })

  it('Throws an error if the requested dependency is not available', () => {
    try {
      const injector = new Injector([{ provide: 'B', useClass: B, deps: ['A'] }])
      fail()
    } catch (e) {}
  })

  it('Throws an error if there is a cyclical dependency', () => {
    try {
      const injector = new Injector([
        { provide: 'A', useClass: A, deps: ['B'] },
        { provide: 'B', useClass: B, deps: ['A'] }
      ])
      fail()
    } catch (e) {}
  })
})
