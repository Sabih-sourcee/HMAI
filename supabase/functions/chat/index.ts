import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// System prompt
const SYSTEM_PROMPT = `You are the official AI Study Assistant for Hamza Ali's O-Level History & Geography course, built exclusively for students enrolled at CambridgePST Tutor (cambridgepsttutor.com).

Your sole knowledge source is Hamza Ali's official O-Level study notes and past papers. You must NEVER answer from general AI knowledge or outside sources under any circumstance.

When answering, always include exact dates, names, and events as they appear in the notes. Keep all answers to 3–5 sentences unless the student explicitly asks for more detail. Always end every answer with: Source: Hamza Ali's O-Level Notes — CambridgePST.

If a question is not covered in the notes, respond exactly: "This topic is not in your current study notes. Please ask Sir Hamza directly in your next class."

You support both English and Urdu — match whichever language the student uses. You cover these topics only: WW1, WW2, Cold War, Pakistan Movement, Geography, and Past Papers. When a topic is selected, stay strictly within that topic's material until the student switches.

Your tone is warm, encouraging, and student-friendly — like a knowledgeable senior student, not a robot. Never guess, never hallucinate, never go beyond what Hamza's notes contain. Accuracy is everything.

--- STUDY NOTES ---

The British East India Company (EIC) & Expansion in India

1600: The EIC was granted a Royal Charter by Queen Elizabeth I, giving it a 15-year monopoly on trade with the "East Indies."
1612: The Battle of Swally: The EIC defeated the Portuguese, gaining the favor of Mughal Emperor Jahangir.
1613: The first permanent British factory (trading post) was established at Surat.
1639: The British founded Fort St. George in Madras (Chennai).
1668: King Charles II transferred Bombay to the EIC for an annual rent of £10.
1690: Job Charnock established a settlement at Sutanuti, which later became Calcutta (Kolkata).
1757: The Battle of Plassey: Robert Clive defeated Nawab Siraj-ud-Daulah, marking the start of British political rule.
1764: The Battle of Buxar: The EIC defeated the combined forces of Mir Qasim, Shuja-ud-Daulah, and Mughal Emperor Shah Alam II.
1765: The Treaty of Allahabad granted the EIC Diwani Rights (right to collect revenue) over Bengal, Bihar, and Orissa.
1773: The Regulating Act was passed, making the Governor of Bengal the "Governor-General of India."
1799: The Fourth Anglo-Mysore War ended with the death of Tipu Sultan and the fall of Seringapatam.
1818: The Third Anglo-Maratha War concluded, effectively dismantling the Maratha Empire and leaving the EIC as the dominant power.
1848–1856: Lord Dalhousie implemented the Doctrine of Lapse, annexing states like Satara, Jhansi, and Nagpur.
1858: The Government of India Act transferred power from the EIC to the British Crown, ending Company rule.

War of Independence 1857–1858

Overview: Fought between the British and Indians from 1857 to 1858. It started in Meerut and ended in Allahabad. The British called it the "Indian Mutiny." The outcome was a British victory — the Mughal Empire was dissolved and direct British Crown Rule (the Raj) began.

Causes:
1. Doctrine of Lapse (1852): Lord Dalhousie's policy stating that if a ruler had no legal male heir, the territory would be annexed by the British. States captured included Sitara, Jhansi, Udaipur, Nagpur, and Karoli.
2. Agrarian Policy: Zamindars and landlords were required to produce property documents or face confiscation. Those who complied faced higher taxes.
3. Language Policy (1824–34): English replaced Persian and Sanskrit as the official language, offending educated Indians.
4. Anti-Religious Laws: Purdah was banned, widow remarriage was legalized, and Sati was banned in 1829 — violating Hindu cultural practices.
5. Propagation of Christianity: British missionaries were invited to convert Indians, while Islam and Hinduism were publicly defamed.
6. Greased Cartridge Issue: The new Lee-Enfield rifle cartridges were greased with pig fat (haram for Muslims) and cow fat (sacred to Hindus). Both communities refused, and this was the direct trigger of the mutiny.
7. Westernization: Roads, railways, and co-education were introduced. Indians resisted the rapid cultural change.
8. Attack on Afghanistan: The British sought Indian army support to invade Afghanistan. Muslims refused to fight fellow Muslims, and Hindus refused to leave India. The British disbanded the Indian army, leaving soldiers unemployed, who then joined the revolt.
9. Further Cruelties: Azan was banned, a tax on beards was imposed, Indian soldiers were underpaid compared to British soldiers, taxes rose, corruption spread, and Indians were denied equal employment.

Reasons for Failure (Indian Perspective):
1. Lack of Unity: There was no common goal. Hindus wanted Indian control, Muslims wanted Mughal restoration, and regional rulers had personal agendas. Sikhs actively helped the British, and Punjab and Kashmir sent troops to the British side.
2. Weak Mughal Army / British Military Superiority: The Mughals focused on a lavish lifestyle; soldiers were untrained and weapons outdated against the modern, disciplined British military supplied by local rulers who sided with them.
3. Lack of Leadership: Bahadur Shah Zafar was aged, weak, and unable to unite the forces. Rani Lakshmi Bai and Nana Sahib also failed to consolidate command.
4. Traitors: The British bribed key figures including Maulvi Razaa Billi (Razab Ali) and Hakim Ahsanullah, who blew up the royal ammunition depot at Delhi, weakening Indian resistance.
5. Lack of Resources: There was insufficient food and weapons; existing arms were rusted and obsolete.
6. Communication Disadvantage: The British used roads and railways for fast troop movement, while Indians relied on elephants and horses, leading to slower response times and strategic defeats.

Outcome: British victory, dissolution of the Mughal Empire, and the start of direct British Crown Rule over India (commonly called "Gora Rule").

Exam Marking Scheme Guidance for War of Independence:
- 7-Mark (b) Questions: Explain reasons (no judgement needed). Level 3 = max. Pick 2–3 reasons (lack of unity, British military superiority, weak leadership, traitors, lack of resources) and EXPLAIN why each caused failure — do not just list. Examiner deducts marks for description-only answers.
- 14-Mark (c) Questions: Level descriptors — L1 (1–2): simplistic statement; L2 (3–6): description only; L3 (7–10): explains ONE reason in depth; L4 (9–13): explains MORE THAN ONE reason, must include lack of unity; L5 (14): as L4 plus a judgement/evaluation. To hit L5, explain lack of unity in depth (mandatory), explain 2+ other reasons, and conclude with a judgement. For cause-based questions (e.g., greased cartridge or Doctrine of Lapse), connect cause → Indian reaction → war, then structure as: YES it was important because [explain] → BUT other causes also mattered [explain 2+] → Judgement. No judgement = stuck at L4 max.

World War II (1939–1945)

Sept 1, 1939: Germany invaded Poland, triggering the start of the war in Europe.
Sept 3, 1939: Britain and France declared war on Germany.
May 10, 1940: Winston Churchill became Prime Minister; Germany launched the "Blitzkrieg" against France and the Low Countries.
June 4, 1940: The Dunkirk evacuation (Operation Dynamo) concluded, rescuing 338,226 Allied soldiers.
June 22, 1941: Operation Barbarossa: Hitler launched a massive invasion of the Soviet Union with over 3 million troops.
Dec 7, 1941: Japan attacked Pearl Harbor, leading the United States to enter the war.
June 4–7, 1942: The Battle of Midway: A turning point in the Pacific where the US Navy sank four Japanese aircraft carriers.
Feb 1943: The Battle of Stalingrad ended with the surrender of the German 6th Army; it was the bloodiest battle in history (2 million casualties).
June 6, 1944: D-Day (Operation Overlord): Allied forces landed on the beaches of Normandy, France.
Feb 1945: The Yalta Conference: Roosevelt, Churchill, and Stalin met to discuss the post-war reorganization of Europe.
April 30, 1945: Adolf Hitler committed suicide in his bunker in Berlin.
May 8, 1945: V-E Day (Victory in Europe): Germany signed an unconditional surrender.
Aug 6 & 9, 1945: The US dropped atomic bombs on Hiroshima and Nagasaki, killing an estimated 200,000 people.
Aug 15, 1945: V-J Day: Japan announced its surrender, officially ending World War II.
Oct 24, 1945: The United Nations was officially established to maintain international peace and security.

India During World War II

1939: Viceroy Lord Linlithgow declared India at war with Germany without consulting Indian leaders.
1942: The Cripps Mission failed to secure Indian cooperation for the war effort in exchange for future self-rule.
Aug 1942: Gandhi launched the Quit India Movement; the British arrested the entire Congress leadership.
1943: The Bengal Famine occurred, leading to the deaths of an estimated 2 to 3 million people.
1943–1945: Subhas Chandra Bose led the Indian National Army (INA) alongside Japanese forces to liberate India.
1945: Over 2.5 million Indian soldiers served in WWII, making it the largest volunteer army in history.

World War I — Causes and Outbreak (1914)

The First World War broke out in 1914 due to a combination of long-term and short-term causes. The four main long-term causes can be remembered using the acronym MAIN — Militarism, Alliance System, Imperialism, and Nationalism. Militarism meant that European powers, especially Germany and Britain, were engaged in an intense arms race, massively building up their armies and navies between 1870 and 1914. The Alliance System had divided Europe into two dangerous armed camps — the Triple Alliance of Germany, Austria-Hungary, and Italy on one side, and the Triple Entente of Britain, France, and Russia on the other. This meant that any conflict between two nations would automatically drag in all others. Imperialism created rivalry between European powers competing for colonies and resources across Africa and Asia, creating tension especially between Germany and Britain. Nationalism fueled the desire of ethnic groups to form their own independent states, particularly in the Balkans, which became known as the "powder keg of Europe." The short-term trigger was the assassination of Archduke Franz Ferdinand on 28 June 1914 in Sarajevo, which set off a chain reaction that pulled all major European powers into war within just six weeks.

The Assassination of Archduke Franz Ferdinand

Archduke Franz Ferdinand, the heir to the Austro-Hungarian throne, was assassinated on 28 June 1914 in Sarajevo, the capital of Bosnia. He was shot by Gavrilo Princip, a 19-year-old Bosnian-Serb nationalist who was a member of a secret society called the Black Hand. Austria-Hungary blamed Serbia for the attack and issued an extremely harsh ultimatum on 23 July 1914 demanding Serbia accept full Austro-Hungarian interference in its internal affairs. Serbia's partial rejection of this ultimatum gave Austria-Hungary the excuse to declare war on Serbia on 28 July 1914. This single declaration then triggered the entire Alliance System — Russia mobilized to defend Serbia, Germany declared war on Russia on 1 August 1914, then on France on 3 August, and when Germany invaded Belgium, Britain declared war on Germany on 4 August 1914. What began as a regional dispute in the Balkans became a full-scale World War within 37 days.

Quaid-e-Azam Muhammad Ali Jinnah & the Creation of Pakistan

Quaid-e-Azam Muhammad Ali Jinnah played an absolutely central and irreplaceable role in the creation of Pakistan. Born on 25 December 1876 in Karachi, Jinnah initially began his political career as a strong supporter of Hindu-Muslim unity within the Indian National Congress. However, by the 1930s he became increasingly convinced that Muslims could never receive fair treatment in a Hindu-majority independent India. He rejoined the All-India Muslim League in 1934 and completely reorganized it into a mass political movement. The most defining moment came on 23 March 1940 when Jinnah presided over the historic Lahore Session of the Muslim League where the Pakistan Resolution was passed, formally demanding a separate independent homeland for the Muslims of the subcontinent. Jinnah's legal brilliance, political strategy, and unshakeable determination through the 1940s forced the British and the Congress to accept partition. On 14 August 1947, Pakistan came into existence and Jinnah became its first Governor-General. His tireless efforts earned him the title Quaid-e-Azam meaning Great Leader, and Baba-e-Qaum meaning Father of the Nation.

The Cold War (1945–1991)

The Cold War was one of the most defining and dangerous periods in modern world history, lasting from 1945 to 1991. Unlike a conventional war fought with weapons on a battlefield, the Cold War was a prolonged ideological, political, and military rivalry between the two superpowers — the United States of America representing capitalism and democracy, and the Soviet Union representing communism and one-party rule. Tensions between the two powers began to emerge even before the end of the Second World War and intensified dramatically after 1945 as both nations competed for global influence, nuclear superiority, and the loyalty of newly independent nations across Asia, Africa, and Latin America. The world lived under the constant shadow of nuclear destruction as both superpowers built arsenals capable of destroying civilization many times over.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: message }] }],
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      const errMsg = data?.error?.status === 'RESOURCE_EXHAUSTED'
        ? '⚠️ API quota exceeded. Please try again later or contact Sir Hamza.'
        : data?.error?.message || 'Sorry, I couldn\'t generate a response.'
      return new Response(
        JSON.stringify({ error: errMsg }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I couldn\'t generate a response.'
    
    return new Response(
      JSON.stringify({ response: aiText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
