// Maps a single System A payload into the shape expected by System B.
// Supports simple path extraction and optional per-field transforms.
function mapSystemAToB(source, fieldMappings) {
  if (!source || !fieldMappings) return {};

  const output = {};

  Object.entries(fieldMappings).forEach(([targetKey, config]) => {
    const path = typeof config === 'string' ? config : config.path;
    const transform =
      typeof config === 'function'
        ? config
        : config && typeof config.transform === 'function'
        ? config.transform
        : null;

    const rawValue = getByPath(source, path);
    output[targetKey] = transform ? transform(rawValue, source) : rawValue;
  });

  return output;
}

function getByPath(obj, path) {
  if (!path) return undefined;
  return path.split('.').reduce((val, key) => (val ? val[key] : undefined), obj);
}

module.exports = {
  mapSystemAToB,
};

