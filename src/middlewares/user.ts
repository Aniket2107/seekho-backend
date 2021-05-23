import User from "../models/userModel";
import Leitner from "../models/algoModel";

export const updateUserPoints = async (request, reply, done) => {
  if (request.params.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const leitnerData = await Leitner.findOne({
      userId: request.params.userId,
    });

    if (leitnerData) {
      let mastered: Array<{
        language: string;
        totalMastered: number;
      }> = [];

      leitnerData.data.map((el) => {
        let master = 0;
        el.levelData.map((dt) => {
          master += dt.mastered.length;
        });
        mastered.push({ language: el.language, totalMastered: master });
      });

      leitnerData.totalWordsLearned = mastered;
      await leitnerData.updateOne(leitnerData);

      const userData = await User.findOne({ _id: request.params.userId });

      let payload: Array<{
        language: string;
        coins: number;
      }> = [];

      leitnerData.totalWordsLearned.map((el) => {
        let temp = {
          language: el.language,
          coins: el.totalMastered,
        };
        payload.push(temp);
      });

      userData.points = payload;

      await userData.updateOne(userData);
    }

    done();
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }

  done();
};
