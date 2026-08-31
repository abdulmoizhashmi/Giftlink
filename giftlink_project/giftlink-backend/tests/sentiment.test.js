import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeSentiment } from '../src/services/sentimentService.js';

test('positive sentiment is detected', () => {
  const result = analyzeSentiment('This is a beautiful and wonderful gift. Thank you!');
  assert.equal(result.sentiment, 'positive');
  assert.ok(result.score > 0);
});

test('negative sentiment is detected', () => {
  const result = analyzeSentiment('The item is broken and terrible.');
  assert.equal(result.sentiment, 'negative');
  assert.ok(result.score < 0);
});

test('neutral text is neutral', () => {
  const result = analyzeSentiment('The lamp is on the table.');
  assert.equal(result.sentiment, 'neutral');
});
