export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const {
      increaseQualityByOne,
      decreaseQualityByOne,
      decreaseSellInByOne,
      items,
    } = this;

    // Loop through all items
    for (const item of items) {
      const name = item.name;
      const isAgedBrie = name.match("Aged Brie");
      const isBackstagePassToTAFKAL80ETC = name.match(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      const isLegendary = name.match("Sulfuras, Hand of Ragnaros");

      if (isLegendary) continue;

      if (isAgedBrie) {
        increaseQualityByOne(item);
        decreaseSellInByOne(item);
        if (item.sellIn < 0) {
          increaseQualityByOne(item);
        }
      } else if (isBackstagePassToTAFKAL80ETC) {
        increaseQualityByOne(item);
        if (item.sellIn < 11) {
          increaseQualityByOne(item);
        }
        if (item.sellIn < 6) {
          increaseQualityByOne(item);
        }

        decreaseSellInByOne(item);

        if (item.sellIn < 0) {
          item.quality = 0;
        }
      } else {
        decreaseQualityByOne(item);
        decreaseSellInByOne(item);
        if (item.sellIn < 0) {
          decreaseQualityByOne(item);
        }
      }
    }

    return items;
  }

  increaseQualityByOne(item: Item) {
    item.quality < 50 && item.quality++;
  }

  decreaseQualityByOne(item: Item) {
    item.quality > 0 && item.quality--;
  }

  decreaseSellInByOne(item: Item) {
    item.sellIn--;
  }
}
