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
    const { items } = this;

    for (const item of items) {
      const name = item.name;
      const isAgedBrie = name.match("Aged Brie");
      const isBackstagePass = name.match(
        "Backstage passes to a TAFKAL80ETC concert"
      );
      const isLegendary = name.match("Sulfuras, Hand of Ragnaros");

      if (isLegendary) continue;

      if (isAgedBrie) {
        this.handleAgedBrie(item);
      } else if (isBackstagePass) {
        this.handleBackstagePass(item);
      } else {
        this.handleRegularItem(item);
      }
    }

    return items;
  }

  // "Aged Brie" items increase in quality by 1 daily, and by 2 if the sellIn value is below 0.
  handleAgedBrie(item: Item) {
    this.increaseQualityByOne(item);
    this.decreaseSellInByOne(item);
    if (item.sellIn < 0) {
      this.increaseQualityByOne(item);
    }
  }

  // "Backstage Passes" items increase in quality based on the sellIn value, with quality set to 0 after the concert.
  handleBackstagePass(item: Item) {
    this.increaseQualityByOne(item);
    if (item.sellIn < 11) {
      this.increaseQualityByOne(item);
    }
    if (item.sellIn < 6) {
      this.increaseQualityByOne(item);
    }

    this.decreaseSellInByOne(item);

    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  // Regular items decrease in quality by 1 daily, and by 2 if the sellIn value is below 0.
  handleRegularItem(item: Item) {
    this.decreaseQualityByOne(item);
    this.decreaseSellInByOne(item);
    if (item.sellIn < 0) {
      this.decreaseQualityByOne(item);
    }
  }

  // Helper functions
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
