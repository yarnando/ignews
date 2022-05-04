import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false,
) {
    // Buscar o usuario no banco do fauna com o ID customerId
    // Salvar os dados da subscription do usuario no FaunaDB
    const userRef = await fauna.query(
        q.Select(
            "ref", //pega só o ref do user
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId) //busca só 1 item

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    if(createAction) {
        await fauna.query(
            q.Create(
                q.Collection('subscriptions'),
                {
                    data: subscriptionData
                }
            )
        )
    } else {
        await fauna.query(
            q.Replace( //replace and update / substitui ou atualiza
                q.Select(
                    "ref", //pega só o ref do user
                    q.Get(
                        q.Match(
                            q.Index('subscription_by_id'),
                            subscriptionId
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )        
    }

    
}