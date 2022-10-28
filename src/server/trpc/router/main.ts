import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db/client";

export const mainRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input, ctx }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx;
  }),
  createPoll: publicProcedure
  .input(
    z.object({
      question: z.string(),
      options: z.string().array().max(4).min(2)
    })
  )
  .mutation(async ({input}) => {
    console.log("Input coming from frontend", input.question);

    //create a question
    const question = await prisma.question.create({data: {
      ask: input.question,
      totalVotes: 0,
      lastVoteAt: new Date(),
      endedAt: new Date(),
      isEnded: false,
    }});
    
    //create options for the questions and relate them to the question created above
    input.options.forEach(async opt => {
      await prisma.options.create({
        data: {
          text: opt,
          votes: 0,
          questionId: question.id 
        }
      })

    })
    console.log(question);
    return {
      isDone: true,
      data: {question}
    };
  })
});
