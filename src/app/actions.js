"use server";

export async function fetchLeetCodeData(username) {
  const query = `
    query getUserData($username: String!, $year: Int) {
      matchedUser(username: $username) {
        username
        githubUrl
        linkedinUrl
        twitterUrl
        profile {
          userSlug
          realName
          aboutMe
          userAvatar
          countryName
          ranking
          reputation
          school
          skillTags
          postViewCount
          solutionCount
          categoryDiscussCount
          starRating
        }
        badges {
          id
          name
          displayName
          icon
          creationDate
        }
        activeBadge {
          id
          name
          displayName
          icon
        }
        contributions {
          points
          questionCount
          testcaseCount
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        languageProblemCount {
          languageName
          problemsSolved
        }
        tagProblemCounts {
          advanced {
            tagName
            problemsSolved
          }
          intermediate {
            tagName
            problemsSolved
          }
          fundamental {
            tagName
            problemsSolved
          }
        }
        userCalendar(year: $year) {
          submissionCalendar
          streak
          totalActiveDays
        }
        contestBadge {
          name
          icon
        }
      }
      recentSubmissionList(username: $username) {
        title
        titleSlug
        lang
        timestamp
        statusDisplay
      }
      recentAcSubmissionList(username: $username, limit: 50) {
        id
        title
        titleSlug
        lang
        timestamp
      }
      userContestRankingHistory(username: $username) {
        attended
        rating
        trendDirection
        contest {
          title
          startTime
        }
        problemsSolved
        ranking
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: username,
          year: 2025,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      throw new Error(data.errors[0].message || "Failed to fetch data");
    }

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: error.message };
  }
}
