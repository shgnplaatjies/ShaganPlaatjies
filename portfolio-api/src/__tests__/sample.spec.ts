import { DataSource } from "typeorm";
import AppDataSourceInit from "../controllers/dataSourceController";

describe("DataSource Connection Tests", () => {
  let dataSource: DataSource;

  beforeAll(async () => (dataSource = await AppDataSourceInit()));

  afterAll(async () => {
    if (dataSource) {
      await dataSource.destroy();
    }
  });

  it("SELECT 1", async () => {
    try {
      const users = await dataSource.query("SELECT 1");
      expect(users).toBeDefined();
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});
