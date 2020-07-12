import { compareLocation, formatLocation } from '../location';

const createLocation = (city, country) => ({ city, country });

describe('compareLocation()', () => {
  it('should compare by country first', () => {
    const location1 = createLocation('Sydney', 'AU');
    const location2 = createLocation('Cairo', 'EG');
    expect(compareLocation(location1, location2)).toBeLessThan(0);
    expect(compareLocation(location2, location1)).toBeGreaterThan(0);
  });

  describe('when country is the same', () => {
    it('should compare by city', () => {
      const location1 = createLocation('Toronto', 'CA');
      const location2 = createLocation('Vancouver', 'CA');
      expect(compareLocation(location1, location2)).toBeLessThan(0);
      expect(compareLocation(location2, location1)).toBeGreaterThan(0);
    });
  });

  describe('when country and city are the same', () => {
    it('should be equal', () => {
      const location1 = createLocation('Shanghai', 'CN');
      const location2 = createLocation('Shanghai', 'CN');
      expect(compareLocation(location1, location2)).toEqual(0);
    })
  })

  it('should treat uppercase similar to lowercase', () => {
    const a = createLocation('a', 'US');
    const b = createLocation('B', 'US');
    const c = createLocation('c', 'US');
    expect(compareLocation(a, b)).toBeLessThan(0);
    expect(compareLocation(b, c)).toBeLessThan(0);
  });

  it('should treat accented similar to unaccented', () => {
    const d = createLocation('d', 'GB');
    const e = createLocation('é', 'GB');
    const f = createLocation('f', 'GB');
    expect(compareLocation(d, e)).toBeLessThan(0);
    expect(compareLocation(e, f)).toBeLessThan(0);
  });
});

describe('formatLocation()', () => {
  describe('given platform is Windows', () => {
    describe('should not contain flag emoji', () => {
      test.each(
        ['Win32', 'Win64']
      )('[%#] %s', (platform) => {
        jest.spyOn(window.navigator, 'platform', 'get').mockReturnValue(platform);
        const actual = formatLocation(createLocation('Toronto', 'CA'));
        expect(actual).toEqual(expect.not.stringContaining('🇨🇦'));
      });
    });
  });

  describe('given platform is not Windows', () => {
    describe('should contain flag emoji', () => {
      test.each(
        ['Macintosh', 'MacIntel', 'iPhone', 'iPad', 'iPod', 'Android', 'Linux aarch64', 'Linux i686']
      )('[%#] %s', (platform) => {
        jest.spyOn(window.navigator, 'platform', 'get').mockReturnValue(platform);
        const actual = formatLocation(createLocation('New York City', 'US'));
        expect(actual).toEqual(expect.stringContaining('🇺🇸'));
      });
    });
  });
});
