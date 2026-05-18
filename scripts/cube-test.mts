import { SOLVED, equals, clone } from '../src/cube/types.ts';
import { applyAlg } from '../src/cube/moves.ts';
import { parseAlg, invertAlg } from '../src/cube/parser.ts';
import { CASES, ALGS } from '../src/data/cases.ts';

let pass = 0;
let fail = 0;

function run(label: string, fn: () => void) {
  try {
    fn();
    console.log('  ✓', label);
    pass++;
  } catch (e) {
    console.log('  ✗', label, '-', (e as Error).message);
    fail++;
    process.exitCode = 1;
  }
}

run('sexy ×6 = identity', () => {
  const s = clone(SOLVED);
  for (let i = 0; i < 6; i++) applyAlg(s, parseAlg("R U R' U'"));
  if (!equals(s, SOLVED)) throw new Error('not solved');
});

for (const c of CASES) {
  const caseAlgs = ALGS.filter((a) => a.caseId === c.id);
  for (const alg of caseAlgs) {
    const label = alg.primary ? `${c.id}` : `${c.id} alt`;
    run(`${label}: context + setup(=primary⁻¹) + alg = context state`, () => {
      // Derived state = context + inverse(primary solve). Each alg (primary
      // or alternate) must take that state back to the context baseline.
      const expected = clone(SOLVED);
      if (c.context) applyAlg(expected, parseAlg(c.context));

      const actual = clone(SOLVED);
      if (c.context) applyAlg(actual, parseAlg(c.context));
      applyAlg(actual, invertAlg(parseAlg(c.solve)));
      applyAlg(actual, parseAlg(alg.notation));

      if (!equals(actual, expected)) throw new Error('mismatch');
    });
  }
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
