function isUndefined(value: any) {
  return value === undefined;
}

function isNull(value: any) {
  return value === null;
}

function isBoolean(value: any) {
  return typeof value === 'boolean';
}

function isObject(value: any) {
  return value === Object(value);
}

function isArray(value: any) {
  return Array.isArray(value);
}

function isDate(value: any) {
  return value instanceof Date;
}

function isBlob(value: any) {
  return (
    value &&
    typeof value.size === 'number' &&
    typeof value.type === 'string' &&
    typeof value.slice === 'function'
  );
}

function isFile(value: any) {
  return (
    isBlob(value) &&
    typeof value.name === 'string' &&
    (typeof value.lastModifiedDate === 'object' ||
      typeof value.lastModified === 'number')
  );
}

function initCfg(value: any) {
  return isUndefined(value) ? false : value;
}

export function serialize(obj: any, cfg?: any, fd?: FormData, pre = '') {
  cfg = cfg || {};
  fd = fd || new FormData();

  cfg.indices = true;
  cfg.nullsAsUndefineds = initCfg(cfg.nullsAsUndefineds);
  cfg.booleansAsIntegers = initCfg(cfg.booleansAsIntegers);
  cfg.allowEmptyArrays = initCfg(cfg.allowEmptyArrays);
  cfg.noFilesWithArrayNotation = initCfg(cfg.noFilesWithArrayNotation);

  if (isUndefined(obj)) {
    return fd;
  } else if (isNull(obj)) {
    if (!cfg.nullsAsUndefineds) {
      fd.append(pre, '');
    }
  } else if (isBoolean(obj)) {
    if (cfg.booleansAsIntegers) {
      fd.append(pre, obj ? '1' : '0');
    } else {
      fd.append(pre, obj);
    }
  } else if (isArray(obj)) {
    if (obj.length) {
      obj.forEach((value: any, index: any) => {
        let key = pre + '[' + (cfg.indices ? index : '') + ']';

        if (cfg.noFilesWithArrayNotation && isFile(value)) {
          key = pre;
        }

        serialize(value, cfg, fd, key);
      });
    } else if (cfg.allowEmptyArrays) {
      fd.append(pre + '[]', '');
    }
  } else if (isDate(obj)) {
    fd.append(pre, obj.toISOString());
  } else if (isObject(obj) && !isFile(obj) && !isBlob(obj)) {
    Object.keys(obj).forEach(prop => {
      const value = obj[prop];

      if (isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf('[]') === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      const key = pre ? pre + '.' + prop : prop;

      serialize(value, cfg, fd, key);
    });
  } else if (!pre.includes('images')) {
    // images will be added subsequently using a different method
    fd.append(pre, obj);
  }

  return fd;
}
