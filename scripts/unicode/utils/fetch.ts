import { memoizeAsyncJ } from "@thi.ng/memoize";
export const unicodeData = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt",
  );

  return await response.text();
})

export const derivedEastAsianWidth = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/extracted/DerivedEastAsianWidth.txt",
  );

  return await response.text();
})

export const derivedGeneralCategory = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/extracted/DerivedGeneralCategory.txt",
  );

  return await response.text();
})


export const derivedCoreProperties = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/DerivedCoreProperties.txt",
  );

  return await response.text();
})


export const graphemeBreakProperty = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/auxiliary/GraphemeBreakProperty.txt",
  );

  return await response.text();
})

export const emojiData = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/emoji/emoji-data.txt",
  );

  return await response.text();
})


export const propList = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt",
  );

  return await response.text();
})

export const derivedNumericType = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/extracted/DerivedNumericType.txt",
  );

  return await response.text();
})

export const derivedDefaultIgnorableCodePoints = memoizeAsyncJ(async () => {
  const response = await fetch(
    "https://www.unicode.org/Public/UCD/latest/ucd/extracted/DerivedDefaultIgnorableCodePoints.txt",
  );

  return await response.text();
})

export const emojiZwjSequences = memoizeAsyncJ(async () => {
    const response = await fetch(
    "https://www.unicode.org/Public/emoji/latest/emoji-zwj-sequences.txt",
  );

  return await response.text();
});

export const emojiSequences = memoizeAsyncJ(async () => {
    const response = await fetch(
    "https://www.unicode.org/Public/emoji/latest/emoji-sequences.txt",
  );

  return await response.text();
});
