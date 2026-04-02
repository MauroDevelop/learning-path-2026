// Large number formatting and basic types
const blocksPlaced: number = 24_000_000; 
const favoriteBiome: string = "Deep Dark";
const hasNetherite: boolean = true;

// Avoid using 'any' in production code. 'unknown' provides type safety
function inspectItem(item: unknown): unknown {
    return item;
}

// Array type annotations
const tools: string[] = ['pickaxe', 'shovel', 'sword'];
const enchantmentLevels: number[] = [20, 12, 5];
const isInventoryFull: boolean[] = [true, false, true];

// Alternative array syntax using Generics
const coordinates: Array<number> = [100, 64, -250];

// Tuples
// Represents a specific data structure: [ID, Username, Rank]
const playerData: [number, string, string] = [30, "mauro_develop", "Premium"];

// Enums 
// Const enums are erased during compilation, optimizing performance
const enum PlayerRank {
    User = 1,
    Vip = 2,
    Moderator = 5,
    Admin = 10
}

const currentRank: PlayerRank = PlayerRank.Admin;

if (currentRank >= PlayerRank.Moderator) {
    console.log("You have permission to ban players.");
}

// Objects and Type Aliases
// Defines the entity blueprint
type Player = {
    readonly id: number; // Prevents reassignment after object initialization
    name: string;
    // Nested object representing spatial coordinates
    location: {
        x: number;
        y: number;
        z: number;
    };
};

// Instantiates the object adhering to the Player type
const nextPlayer: Player = {
    id: 1,
    name: "MauroDevelop123",
    location: {
        x: 150,
        y: 64,
        z: -200
    }
};