import { Schema } from "mongoose";
import { Snowflake, SnowFlakeConfig } from "snowflake-uid";

const applySnowflakeId = (Schema: Schema) => {
  Schema.pre("save", async function (next) {
    if (!this.isNew || this.id != null) {
      console.log("not new");
      return next();
    }
    const config: SnowFlakeConfig = {
      epoch: 1546300800000,
      workerId: 1,
      processId: 1,
      toString: true,
    };
    const snowflake = new Snowflake(config);

    const generatedId = snowflake.generate() as string;
    this.id = generatedId;
    next();
  });
};

export default applySnowflakeId;
