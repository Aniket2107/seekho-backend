import Leitner from "../models/algoModel";

export const updateMastered = async (request, reply, done) => {
  if (request.body.userId.match(/^[0-9a-fA-F]{24}$/)) {
    const leitnerData = await Leitner.findOne({ userId: request.body.userId });

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
    }

    //TODO:
    //Update user progress: ;)
    done();
  } else {
    return reply.code(500).send({ success: false, msg: "Enter valid userId" });
  }
};
