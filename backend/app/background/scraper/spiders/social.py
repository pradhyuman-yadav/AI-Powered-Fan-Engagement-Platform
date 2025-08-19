# In social_scraper/spiders/social.py

import scrapy
import json
import re

class SocialSpider(scrapy.Spider):
    name = 'social'
    # We remove allowed_domains to handle any URL passed in.

    def start_requests(self):
        """
        This method is called by Scrapy to start the crawling process.
        It reads the URLs passed from the command line or a runner script.
        """
        # Get the urls passed in from our runner script
        urls = getattr(self, 'urls', [])
        for url in urls:
            yield scrapy.Request(url, callback=self.parse)

    def parse(self, response):
        """
        This is the main parsing method. It acts as a router, sending
        the response to the appropriate method based on the URL's domain.
        """
        if 'instagram.com' in response.url:
            yield from self.parse_instagram(response)
        elif 'x.com' in response.url or 'twitter.com' in response.url:
            yield from self.parse_x(response)

    def parse_instagram(self, response):
        """
        Parses an Instagram post page to download all images.
        Instagram embeds post data in a JSON object within a <script> tag.
        """
        self.log(f"Processing Instagram URL: {response.url}")
        
        # Modern web pages often store data in JSON within script tags
        script_text = response.xpath('//script[contains(., "xdt_api__v1__media__shortcode__web_info")]/text()').get()
        
        if not script_text:
            self.log(f"Could not find Instagram data on {response.url}")
            return

        try:
            # Extract the JSON part from the script
            data_json = json.loads(script_text)
            media_items = data_json['items']
            
            image_urls = []
            for item in media_items:
                # Check for multiple images in a carousel
                if 'carousel_media' in item:
                    for media in item['carousel_media']:
                        # Get the highest resolution image
                        image_url = media['image_versions2']['candidates'][0]['url']
                        image_urls.append(image_url)
                # Handle single image/video posts
                else:
                    if 'image_versions2' in item:
                        image_url = item['image_versions2']['candidates'][0]['url']
                        image_urls.append(image_url)

            # Yield an item for the ImagesPipeline to process
            if image_urls:
                yield {
                    'image_urls': image_urls,
                    'source_url': response.url # For reference
                }

        except (json.JSONDecodeError, KeyError) as e:
            self.log(f"Error parsing Instagram JSON on {response.url}: {e}")

    def parse_x(self, response):
        """
        Parses an X (Twitter) page to extract all tweets.
        """
        self.log(f"Processing X/Twitter URL: {response.url}")

        # X uses specific 'data-testid' attributes which are more stable than CSS classes
        for tweet in response.css('article[data-testid="tweet"]'):
            tweet_text_parts = tweet.css('div[data-testid="tweetText"] ::text').getall()
            full_tweet_text = "".join(tweet_text_parts).strip()

            if full_tweet_text:
                yield {
                    'tweet_text': full_tweet_text,
                    'user': tweet.css('div[data-testid="User-Name"] span:contains("@")::text').get(),
                    'source_url': response.url
                }