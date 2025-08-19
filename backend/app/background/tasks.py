from typing import List
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from app.background.scraper.spiders.social import SocialSpider

def process_all_urls(urls: List[str]):
    print("\n--- Starting background URL processing ---")
    if not urls:
        print("No URLs to process.")
        return
        
    process = CrawlerProcess(settings={
        "FEEDS": {
            "tweets.jsonl": {"format": "jsonlines", "overwrite": True},
        },
        **get_project_settings() # Use settings from settings.py
    })

    # Start the crawler with our spider and pass the URLs
    process.crawl(SocialSpider, urls=urls)
    
    # The script will block here until the crawling is finished
    process.start()
        
        
    print("--- Finished background URL processing ---")
