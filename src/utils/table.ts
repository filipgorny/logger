// Utility for creating beautiful ASCII tables with colors and emoji using cli-table3
import Table from "cli-table3";

export interface TableColumn {
  header: string;
  key: string;
  width?: number;
  align?: "left" | "center" | "right";
}

export interface TableOptions {
  title?: string;
  emoji?: string;
  color?: string;
}

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  white: "\x1b[37m",
  gray: "\x1b[90m",
};

export function createTable(
  data: any[],
  columns: TableColumn[],
  options: TableOptions = {},
): string {
  if (data.length === 0) {
    return `${options.emoji || "📋"} No data to display`;
  }

  // Create table with headers
  const table = new Table({
    head: columns.map((col) => col.header),
    colAligns: columns.map((col) => col.align || "left") as Array<
      "left" | "center" | "right"
    >,
    style: {
      head: ["cyan", "bold"],
      border: ["gray"],
    },
  });

  // Add rows
  data.forEach((row) => {
    const rowData = columns.map((col) => String(row[col.key] || ""));
    table.push(rowData);
  });

  // Build output
  const parts: string[] = [];

  // Title
  if (options.title) {
    const emoji = options.emoji || "📊";
    const titleColor =
      colors[options.color as keyof typeof colors] || colors.cyan;
    parts.push(
      `\n${emoji}  ${titleColor}${colors.bright}${options.title}${colors.reset}\n`,
    );
  }

  // Table
  parts.push(table.toString());
  parts.push(""); // Empty line after table

  return parts.join("\n");
}
