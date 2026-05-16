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
  const alg = ALGS.find((a) => a.caseId === c.id && a.primary);
  if (!alg) continue;
  run(`${c.id}: setup(=alg⁻¹) + alg → solved`, () => {
    const s = clone(SOLVED);
    applyAlg(s, invertAlg(parseAlg(c.solve)));
    applyAlg(s, parseAlg(alg.notation));
    if (!equals(s, SOLVED)) throw new Error('mismatch');
  });
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
